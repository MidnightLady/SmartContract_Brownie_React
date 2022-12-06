import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = configureStore({
    reducer: rootReducer,
    devTools: 'true',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(...middlewares),
});

sagaMiddleware.run(rootSaga);

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
