import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      {!user && (
        <div className="mb-6 text-center">
          <p className="mb-2">Please login or register to order food.</p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Register
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r._id}
            className="border rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4"
            onClick={() => navigate(`/menu/${r._id}`)}
          >
            <img
              src={r.image}
              alt={r.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{r.name}</h2>
            <p className="mt-1 text-gray-700">{r.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Delivery: {r.deliveryTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
