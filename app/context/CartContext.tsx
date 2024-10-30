// CartContext.tsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [currentScreen, setCurrentScreen] = useState("Cart"); // Default value for current screen

    const addToCart = (book) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.book.id === book.id);
            if (existingItem) {
                return prevItems.map(item => 
                    item.book.id === book.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            return [...prevItems, { book, quantity: 1 }];
        });
    };

    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.book.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.book.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.book.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prevItems.filter(item => item.book.id !== id);
        });
    };

    const removeFromCart = (id) => {
        console.log('Removing item with ID:', id);
        setCartItems(prevItems => prevItems.filter(item => item.book.id !== id));
    };

    const proceedToCheckout = () => {
        const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * Number(item.book.price)), 0);
        return totalPrice;
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            increaseQuantity, 
            decreaseQuantity, 
            removeFromCart,
            proceedToCheckout,
            currentScreen, // To access current screen value if needed
            setCurrentScreen // Provide the function to change the current screen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

