/*import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addCartItem, removeCartItem } from "../api/api";

// ✅ Named export
export const CartContext = createContext();

// CartProvider wraps the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart function
  const loadCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const res = await getCart();
      setCartItems(res.data.items || []);
    } catch (err) {
      console.log("Cart load skipped", err);
    }
  };

  // ✅ Load cart when app starts safely
  useEffect(() => {
    const fetchCart = async () => {
      await loadCart();
    };
    fetchCart();
  }, []);

  // ✅ Reload cart on login/logout events safely
  useEffect(() => {
    const handleLogin = async () => await loadCart();
    const handleLogout = () => setCartItems([]);

    window.addEventListener("userLoggedIn", handleLogin);
    window.addEventListener("userLoggedOut", handleLogout);

    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  // ✅ Add item
  const addToCart = async (food) => {
    try {
      const res = await addCartItem(food);
      setCartItems(res.data.items);
    } catch (err) {
      console.log("Add to cart failed", err);
    }
  };

  // ✅ Remove item
  const removeFromCart = async (foodId) => {
    try {
      const res = await removeCartItem(foodId);
      setCartItems(res.data.items);
    } catch (err) {
      console.log("Remove from cart failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
*/



import { useState, useEffect } from "react";
import { getCart, addCartItem, removeCartItem } from "../api/api";
import { CartContext } from "./cart-context";


//export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart function
  const loadCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const res = await getCart();
      setCartItems(res.data.items || []);
    } catch {
      console.log("Cart load skipped");
    }
  };

  // Load cart on app start
  useEffect(() => {
    const fetchCart = async () => {
      await loadCart();
    };
    fetchCart();
  }, []);

  // Add item
  const addToCart = async (food) => {
    try {
      const res = await addCartItem(food);
      setCartItems(res.data.items);
    } catch (err) {
      console.log("Add to cart failed", err);
    }
  };

  // Remove item
  const removeFromCart = async (foodId) => {
    try {
      const res = await removeCartItem(foodId);
      setCartItems(res.data.items); // ✅ after backend fix
    } catch (err) {
      console.log("Remove from cart failed", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
/*export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};*/
