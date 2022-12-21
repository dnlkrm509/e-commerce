import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        addToWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item =>
                item.id === newItem.id
            )

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    rating: newItem.rating,
                    price: newItem.price,
                    brand: newItem.brand
                });
            }
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        }
    }
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;