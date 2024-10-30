// CartContext.tsx
import React, { createContext, useState, ReactNode, FC } from 'react';
import { Book } from '../../type';

export interface CartItem {
    book: Book;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (book: Book) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    proceedToCheckout: () => number;
    currentScreen: string;
    setCurrentScreen: (screen: string) => void;
}

// Initialize the context with a default value of undefined to enforce type checking
export const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component props with children as ReactNode for typing
interface CartProviderProps {
    children: ReactNode;
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [currentScreen, setCurrentScreen] = useState<string>("Cart"); // Default value for current screen

    const addToCart = (book: Book) => {
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

    const increaseQuantity = (id: string) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.book.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
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

    const removeFromCart = (id: string) => {
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
            currentScreen,
            setCurrentScreen 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
