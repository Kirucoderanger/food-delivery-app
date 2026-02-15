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
};
*/

/*

// CartProvider.jsx
import { useState, useEffect } from "react";
import { getCart, addCartItem, removeCartItem } from "../api/api";
import { CartContext } from "./cart-context";
import { useAuth } from "../hooks/useAuth";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token, user } = useAuth(); // get token and user from auth

  // Load cart function
  const loadCart = async () => {
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const res = await getCart(token);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.log("Cart load skipped", err);
    }
  };

  // Auto-load cart when user logs in or token changes
  useEffect(() => {
    if (user && token) {
      loadCart();

      
    }
  }, [user, token]);

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

 

    
  

  // Add item
  const addToCart = async (food) => {
    try {
      const res = await addCartItem(food, token);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.log("Add to cart failed", err);
    }
  };

  // Remove item
  const removeFromCart = async (foodId) => {
    try {
      const res = await removeCartItem(foodId, token);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.log("Remove from cart failed", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
*/

//import { createContext } from "react";

//export const CartContext = createContext();

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
            prev.map((item) => (item._id === id ? { ...item, quantity } : item))
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
*/
/*

import { createContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth(); // get token from auth

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
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

*/
