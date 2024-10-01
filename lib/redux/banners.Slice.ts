
import { fetchBanner, fetchBanners } from "@/app/ultil/fetch-auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export type TBanner = {
  id: number;
  label: string;
  thumbnail: string;
  category_id: number;
};

export interface Category {
  id: number;
  name: string;
  categories_child: Category[]; 
}

export interface BannerState {
  banners: TBanner[];
  categories: Category[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedBannerId: number | null;
}

const initialState: BannerState = {
  banners: [],
  categories: [],
  status: "idle",
  error: null,
  selectedBannerId: null,
};

// Async thunk to fetch banners and process image URLs
export const fetchBannersThunk = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const banners = await fetchBanner();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return banners.map((banner: any) => ({
      id: banner.id,
      label: banner.label,
      thumbnail: banner.thumbnail,
      category_id: banner.category_id || [],
    }));
  }
);

// Async thunk to fetch categories with nested subcategories
export const fetchCategoriesThunk = createAsyncThunk(
  "banners/fetchCategories",
  async () => {
    const categories = await fetchBanners();
    return categories; // Assuming the backend returns categories with nested subcategories
  }
);

export const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanner: (state, action: PayloadAction<TBanner>) => {
      const { id, label, thumbnail, category_id } = action.payload;
      const existingBanner = state.banners.find((banner) => banner.id === id);
      state.selectedBannerId = id;
      if (existingBanner) {
        if (label) existingBanner.label = label;
        if (thumbnail) existingBanner.thumbnail = thumbnail;
        if (category_id) existingBanner.category_id = category_id;
      } else {
        state.banners.push(action.payload);
      }
    },
    updateBanner: (state, action: PayloadAction<TBanner>) => {
      const index = state.banners.findIndex(
        (banner) => banner.id === action.payload.id
      );
      if (index !== -1) {
        state.banners[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannersThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBannersThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchBannersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch banners";
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setBanner, updateBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
