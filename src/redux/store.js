
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.js';
import cardReducer from './card.js';

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedCardReducer = persistReducer(persistConfig, cardReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        card: cardReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})