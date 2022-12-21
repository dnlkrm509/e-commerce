import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item =>
                item.id === newItem.id
            )

            state.totalQuantity++;
            state.totalPrice += newItem.price * newItem.quantity;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    rating: newItem.rating,
                    price: newItem.price,
                    brand: newItem.brand,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price * newItem.quantity
                });
            } else {
                existingItem.totalPrice = newItem.totalPrice;
                existingItem.quantity++;
            }
        },
        removeOneFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item =>
                item.id === id
            )

            state.totalQuantity--;
            state.totalPrice -= existingItem.price;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.totalPrice -= existingItem.price;
                existingItem.quantity--;
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            const priceToBeDeducted = existingItem.price * existingItem.quantity;
            state.totalPrice -= priceToBeDeducted;
            state.totalQuantity = 0;
            state.items = state.items.filter(item => item.id !== id);
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;