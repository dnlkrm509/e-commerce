import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        }
    }
})

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;