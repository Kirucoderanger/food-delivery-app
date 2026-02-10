/*import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent flashing content

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border rounded p-4"
            >
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-lg">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
*/
/*
import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0)
    return <p className="p-4">Your cart is empty.</p>;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.foodId}
          className="flex justify-between items-center border p-2 rounded mb-2"
        >
          <div>
            <p className="font-semibold">{item.food.name}</p>
            <p className="text-sm text-gray-500">
              Price: ${item.food.price} x {item.quantity}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.foodId)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      ))}
      <p className="mt-4 font-bold text-lg">Total: ${totalPrice}</p>
    </div>
  );
};

export default Cart;
*/




/*

import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <p className="p-4 text-center">Your cart is empty</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-4 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.food.image}
                alt={item.food.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-bold">{item.food.name}</h2>
                <p>Price: ${item.food.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.foodId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
      </div>
    </div>
  );
};

export default Cart;
*/






/*


import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
    const handleCheckout = () => {
    navigate("/checkout");
  };

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );
  

  if (cartItems.length === 0)
    return <p className="p-4 text-center">Your cart is empty</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-4 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.food.image}
                alt={item.food.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-bold">{item.food.name}</h2>
                <p>Price: ${item.food.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.foodId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
      </div>
    </div>
  );
};

export default Cart;
*/











import React from "react";
//import { useCart } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

   // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id || item.foodId} // use _id or foodId
              className="flex items-center justify-between border p-4 rounded shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-600">
                    Name: {item.food.name} | Price: ${item.food.price} x {item.quantity}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Subtotal: ${item.food.price * item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.foodId || item._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <HiOutlineTrash size={20} />
              </button>
            </div>
          ))}

          {/* Total + Checkout */ }
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="font-bold text-lg">Total: ${totalPrice}</span>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;











/*
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Ensure price is numeric to prevent NaN
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const itemId = item.foodId || item._id;
            const price = Number(item.price) || 0;
            const quantity = item.quantity || 1;
            return (
              <div
                key={itemId}
                className="flex items-center justify-between border p-4 rounded shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-gray-600">
                      Price: ${price} x {quantity}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Subtotal: ${(price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(itemId)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            );
          })}

          {/* Total + Checkout }
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="font-bold text-lg">
              Total: ${totalPrice.toFixed(2)}
            </span>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
*/