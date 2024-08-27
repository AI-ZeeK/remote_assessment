"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { app, modal, user } from "./features/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { encryptTransform } from "redux-persist-transform-encrypt";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { WebStorage, Transform } from "redux-persist";
import apiSlice from "./services/api/api";

const persistConfig: any = {
  key: "root-access",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_ENCRYPT_KEY || "SecreteKey",
      onError: (error) => {
        console.error("Encryption error:", error);
      },
    }),
  ],
  stateReconciler: hardSet,
  whitelist: ["app", "modal", "user"],
};

const rootReducer = combineReducers({
  app,
  modal,
  user,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export default store;
export { persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
