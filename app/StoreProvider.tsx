"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";
import { AuthProvider } from "./login/AuthContext";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children} </AuthProvider>
    </Provider>
  );
};

export default StoreProvider;
