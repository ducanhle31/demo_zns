import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./campaign.Slice";
import bannerReducer from "./banners.Slice";
import productsReducer from "./products.Slice";

export const store = configureStore({
  reducer: {
    campaign: campaignReducer,
    banners: bannerReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
