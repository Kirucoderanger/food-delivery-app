/*import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFoodsByRestaurant } from "../api/api";
//import { useCart } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
const Menu = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFoodsByRestaurant(id)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <img src={food.image} alt={food.name} className="w-full h-48 object-cover rounded mb-2"/>
            <h2 className="text-xl font-bold">{food.name}</h2>
            <p className="mt-1 text-gray-700">Price: ${food.price}</p>
            <p className="text-sm text-gray-500 mt-1 mb-2">Category: {food.category}</p>
            <button
              onClick={() => addToCart(food)}
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
*/


import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchFoodsByRestaurant,
  createFood,
  updateFood,
  deleteFood,
} from "../api/api";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const Menu = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });


  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  //const isAdmin = user?.role === "admin";
  const userRole = user ? jwtDecode(localStorage.getItem("token")).role : null;
  const isAdmin = userRole === "admin";

  useEffect(() => {
    fetchFoodsByRestaurant(id)
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // ---------- Add To Cart ----------
  const handleAddToCart = (food) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(food);
  };

  // ---------- Open Add ----------
  const openAddModal = () => {
    setEditingFood(null);
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "",
    });
    setModalOpen(true);
  };

  // ---------- Open Edit ----------
  const openEditModal = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      price: food.price,
      image: food.image,
      category: food.category,
    });
    setModalOpen(true);
  };

  // ---------- Delete ----------
  const handleDelete = async (foodId) => {
    if (!window.confirm("Delete this food item?")) return;

    try {
      await deleteFood(foodId);
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingFood) {
        const res = await updateFood(editingFood._id, formData);

        setFoods((prev) =>
          prev.map((f) =>
            f._id === editingFood._id ? res.data : f
          )
        );
      } else {
        const res = await createFood({
          ...formData,
          restaurant: id,
        });

        setFoods((prev) => [...prev, res.data]);
      }

      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">
        &larr; Back to Home
      </Link>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu</h1>

        {isAdmin && (
          <button
            onClick={openAddModal}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            + Add Food
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col relative group"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded mb-2"
            />

            <h2 className="text-xl font-bold">{food.name}</h2>
            <p className="mt-1 text-gray-700">Price: ${food.price}</p>
            <p className="text-sm text-gray-500 mt-1 mb-2">
              Category: {food.category}
            </p>

            {!isAdmin && (
              <button
                onClick={() => handleAddToCart(food)}
                className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            )}

            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEditModal(food)}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(food._id)}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingFood ? "Edit Food" : "Add Food"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Image URL"
                className="w-full border p-2 rounded"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Category"
                className="w-full border p-2 rounded"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  {editingFood ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;