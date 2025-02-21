"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Product {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
}


export const CartContext = createContext<ICartContext>({
    toggleCart: () => { },
    isOpen: false,
    products: []
});

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev);
    }
    return (
        <CartContext.Provider value={{isOpen, products, toggleCart}}>
            {children}
        </CartContext.Provider>
    );
};