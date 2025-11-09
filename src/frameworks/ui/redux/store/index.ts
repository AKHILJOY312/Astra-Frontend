// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../slices/authSlice";
// // import projectSlice from './slices/projectSlice';
// // import channelSlice from './slices/channelSlice';
// // import messageSlice from './slices/messageSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     // projects: projectSlice,
//     // channels: channelSlice,
//     // messages: messageSlice
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

// 1. Create persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

// 2. Combine reducers (if more slices later)
const rootReducer = combineReducers({
  auth: authReducer,
});

// 3. Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ignore redux-persist warnings
    }),
});

// 5. Create persistor
export const persistor = persistStore(store);

// 6. Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
