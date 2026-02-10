import { createContext } from "react";

export const CartContext = createContext();

/********* Previous version *********/
/*import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    // Add item to cart
    const addToCart = (food) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === food._id);
            if (existing) {
                return prev.map((item) =>
                    item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...food, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    };

    // Update quantity
    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
            )
        );
    };

    // Calculate total
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    );
};

*/