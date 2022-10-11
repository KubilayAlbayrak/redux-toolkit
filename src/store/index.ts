import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slicers/counter.slice';
import { pokemonApi } from '../services/pokemon.service';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slicers/users.slice';

export const store = configureStore({
  reducer: {
    count: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
