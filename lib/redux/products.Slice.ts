// redux/products.slice.ts

import { fetchProducts } from "@/app/ultil/fetch-auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "https://zaloapp.ongdev.online/api/v1";

export type IProduct = {
  id: number;
  name?: string;
  th_zalo_app_info?: {
    image: string;
    desc?: string;
    title?: string;
    path?: string;
  };
  description?: string;
  sale_ok?: boolean;
  list_price?: number;
  categ_id?: number;
};

export interface ProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  selectedProductId: number | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProductId: null,
};

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const products = await fetchProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processedProducts = products.map((product: any) => {
        let parsedInfo;
        try {
          parsedInfo = JSON.parse(product.th_zalo_app_info);
        } catch (error) {
          parsedInfo = {};
        }

        return {
          ...product,
          th_zalo_app_info: {
            ...parsedInfo,
            image: parsedInfo.image,
          },
        };
      });

      return processedProducts;
    } catch (error) {
      console.error("Error in fetchProductsThunk:", error);
      throw error;
    }
  }
);

export const submitProductUpdateThunk = createAsyncThunk(
  "products/submitProductUpdate",
  async (
    {
      productId,
      file,
      desc,
      existingImageUrl,
      token, // Receive token as an argument
    }: {
      productId: number;
      file: File | null;
      desc: string;
      existingImageUrl: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    formData.append("desc", desc);
    formData.append("existingImageUrl", existingImageUrl);

    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Use the token here
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }

      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      const { id, th_zalo_app_info } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          th_zalo_app_info: {
            ...state.products[index].th_zalo_app_info,
            ...th_zalo_app_info,
            image:
              th_zalo_app_info?.image ||
              state.products[index].th_zalo_app_info?.image ||
              "",
          },
        };
      }
    },
    updateProductDescription: (
      state,
      action: PayloadAction<{ index: number; desc: string }>
    ) => {
      const { index, desc } = action.payload;
      if (state.products[index]) {
        state.products[index].th_zalo_app_info = {
          ...state.products[index].th_zalo_app_info,
          desc,
          image: state.products[index].th_zalo_app_info?.image || "",
        };
      }
    },
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsThunk.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(
        submitProductUpdateThunk.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          const updatedProduct = action.payload;
          const index = state.products.findIndex(
            (product) => product.id === updatedProduct.id
          );
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        }
      )
      .addCase(
        submitProductUpdateThunk.rejected,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: PayloadAction<any>) => {
          state.error = action.payload || "Failed to update product";
        }
      );
  },
});

export const { setProduct, updateProductDescription, setSelectedProductId } =
  productsSlice.actions;
export default productsSlice.reducer;
