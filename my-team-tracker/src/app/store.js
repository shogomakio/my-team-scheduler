import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import upcomingReducer from '../features/upcoming/upcomingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    upcoming: upcomingReducer,
  },
});
