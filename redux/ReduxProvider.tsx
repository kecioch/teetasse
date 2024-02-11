"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ReduxProvider({ children, fallback = null }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={fallback} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
