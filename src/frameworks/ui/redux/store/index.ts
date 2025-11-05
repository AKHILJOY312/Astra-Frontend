import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
// import projectSlice from './slices/projectSlice';
// import channelSlice from './slices/channelSlice';
// import messageSlice from './slices/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // projects: projectSlice,
    // channels: channelSlice,
    // messages: messageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
