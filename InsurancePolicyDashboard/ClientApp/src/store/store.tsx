import {combineReducers, configureStore} from '@reduxjs/toolkit';
import policyStore from './policy-slice';

const reducers = combineReducers({
    policy: policyStore
});

export const store = configureStore({
    reducer: reducers
});

export type State = ReturnType<typeof store.getState>;