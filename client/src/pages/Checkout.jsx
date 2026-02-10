import React, { useState } from "react";
//import { useCart } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cartItems, loadCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!deliveryAddress) {
      setError("Please enter a delivery address.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems.map((item) => ({
            foodId: item._id || item.foodId,
            quantity: item.quantity,
            price: item.food.price,
            name: item.food.name,
          })),
          deliveryAddress,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear cart after successful order
      await loadCart();

      // Navigate to Orders page
      navigate("/orders");

      console.log("Order placed successfully:", res.data);
    } catch (err) {
      console.error("Failed to place order:", err);
      setError(
        err.response?.data?.message || "Failed to place order. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Delivery Address
            </label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter your delivery address"
            />
          </div>
          <div className="border-t pt-2">
            <h2 className="font-bold text-lg mb-2">Order Summary</h2>
            {cartItems.map((item) => (
                <div key={item._id || item.foodId} className="flex justify-between">
                    <div>
                        <p>{item.food.name} x {item.quantity}</p>
                    
                    <p>${item.food.price * item.quantity}</p>
                 </div>
                 </div>
              ))}
              </div>

          <div className="border-t pt-2">
            <p className="font-bold text-lg">Total: ${totalPrice}</p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
