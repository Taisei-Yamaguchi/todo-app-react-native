// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import LoadingSlice from './slice/LoadingSlice';
import ListSlice from './slice/ListSlice';

const store = configureStore({
    reducer: {
        loading: LoadingSlice,
        list: ListSlice,
    },
});

export default store;
