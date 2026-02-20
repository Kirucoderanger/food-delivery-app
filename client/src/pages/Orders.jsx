import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem("token");
        //const res = await axios.get("http://localhost:5000/api/orders", {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <p className="p-4">Please login to view your orders.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4 shadow">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID:</span>
                <span>{order._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Status:</span>
                <span>{order.status}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Delivery Address:</span> {order.deliveryAddress}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="pl-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item.foodId}>
                      {item.name} _ {item.quantity} X {item.price} = (${item.price * item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-bold">
                Total: ${order.totalPrice}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
