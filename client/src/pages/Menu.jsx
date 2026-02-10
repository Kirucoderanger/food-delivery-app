import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchFoodsByRestaurant } from "../api/api";
//import { useCart } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const Menu = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoodsByRestaurant(id)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = (food) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(food);
  };

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-bold">{food.name}</h2>
            <p className="mt-1 text-gray-700">Price: ${food.price}</p>
            <p className="text-sm text-gray-500 mt-1 mb-2">Category: {food.category}</p>
            <button
              onClick={() => handleAddToCart(food)}
              className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
