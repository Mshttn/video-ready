// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlices';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import downloadReducer from './Slices/downloadSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user','downloadvd'], 
};

const rootReducer = combineReducers({
  user: userReducer,
   downloadvd: downloadReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
