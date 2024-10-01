import { useDispatch, useSelector } from "react-redux";
import { setSelectedProductId } from "@/lib/redux/products.Slice";
import { AppDispatch, RootState } from "@/lib/redux/store";

export const useProducts = (id?: number) => {
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading); // Get the loading state
  const product = id
    ? products.find((product) => product.id === id)
    : undefined;
  const selectedProductId = useSelector(
    (state: RootState) => state.products.selectedProductId
  );
  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  );

  const dispatch = useDispatch<AppDispatch>();

  const selectProduct = (productId: number) => {
    dispatch(setSelectedProductId(productId));
  };

  return {
    products,
    product,
    selectProduct,
    selectedProductId,
    selectedProduct,
    loading, // Include the loading state in the return
  };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
