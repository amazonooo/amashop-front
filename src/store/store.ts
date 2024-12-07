import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { cartSlice } from './cart/cart.slice'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore
} from 'redux-persist'

const persistConfig = {
	key: 'ama-shop',
	storage,
	whitelist: ['cart']
}

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
	cart: cartSlice.reducer
})

const mainReducer = isClient
	? require('redux-persist').persistReducer(persistConfig, combinedReducers)
	: combinedReducers

export const store = configureStore({
	reducer: mainReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof combinedReducers>
