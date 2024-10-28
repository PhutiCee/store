import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const initialState = { shoppingCart: [], totalPrice: 0, totalQty: 0 };
    const [cart, dispatch] = useReducer(CartReducer, initialState);

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}