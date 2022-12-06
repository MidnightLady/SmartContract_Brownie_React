import { combineReducers } from '@reduxjs/toolkit';
import { reducer as projectsSlice } from '../reducers/project/projectSlice'

export const rootReducer = combineReducers({
    projects:projectsSlice
});
