import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedListId: 'main',
};

const ListSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setSelectedListId: (state, action) => {
        state.selectedListId = action.payload;
        },
    },
});


export const { 
    setSelectedListId, 
} = ListSlice.actions;

export default ListSlice.reducer;