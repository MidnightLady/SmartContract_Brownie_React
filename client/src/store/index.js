import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const store = configureStore({
    reducer: rootReducer,
    devTools: 'true',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),

});



export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
