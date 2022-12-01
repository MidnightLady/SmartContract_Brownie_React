import { combineReducers } from '@reduxjs/toolkit';
import { reducer as projectsSlice } from '../slices/projectSlice'

export const rootReducer = combineReducers({
    projects:projectsSlice
});
