import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const brandSlice = createSlice({
    name: 'brands',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        }
    }
})

export const brandActions = brandSlice.actions;

export default brandSlice.reducer;