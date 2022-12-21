import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        }
    }
})

export const productActions = productSlice.actions;

export default productSlice.reducer;