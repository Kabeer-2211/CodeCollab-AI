import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '@redux/slices/auth'

const rootReducer = combineReducers({ auth: authReducer })

const filterTransform = createTransform(
    (inboundState) => {
        const { user, ...rest } = inboundState;
        return rest;
    },
    (outboundState) => outboundState
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [filterTransform],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
