import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './categories-slice';
import brandReducer from './brands-slice';
import productsReducer from './products-slice';
import cartReducer from './cart-slice';
import wishlistReducer from './wishlist-slice';

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        brands: brandReducer,
        products: productsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
})

export default store;