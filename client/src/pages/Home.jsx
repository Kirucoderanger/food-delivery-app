/*import React, { useEffect, useState } from "react";
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
*/


/*
import React, { useEffect, useState } from "react";
import { fetchRestaurants, deleteRestaurant } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const userRole = user ? jwtDecode(localStorage.getItem("token")).role : null;

  //const isAdmin = user?.role === "admin";
  const isAdmin = userRole === "admin";

  useEffect(() => {
    fetchRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (!confirmDelete) return;

    try {
      await deleteRestaurant(id);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">

      {/* Non-authenticated Notice *}
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

      {/* Admin Add Button *}
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => navigate("/admin/add-restaurant")}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            + Add Restaurant
          </button>
        </div>
      )}

      {/* Restaurant Grid *}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r._id}
            className="relative border rounded-lg shadow hover:shadow-lg transition group"
          >
            {/* Clickable Card Body *}
            <div
              className="cursor-pointer p-4"
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

            {/* Admin Controls *}
            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/edit-restaurant/${r._id}`);
                  }}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(r._id);
                  }}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
*/


import React, { useEffect, useState } from "react";
import {
  fetchRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    deliveryTime: "",
  });

  const navigate = useNavigate();
  const { user } = useAuth();
  //const isAdmin = user?.role === "admin";
  const userRole = user ? jwtDecode(localStorage.getItem("token")).role : null;
  const isAdmin = userRole === "admin";


  useEffect(() => {
    fetchRestaurants()
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ---------- Delete ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteRestaurant(id);
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Open Add ----------
  const openAddModal = () => {
    setEditingRestaurant(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      deliveryTime: "",
    });
    setModalOpen(true);
  };

  // ---------- Open Edit ----------
  const openEditModal = (restaurant, e) => {
    e.stopPropagation();
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      description: restaurant.description,
      image: restaurant.image,
      deliveryTime: restaurant.deliveryTime,
    });
    setModalOpen(true);
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingRestaurant) {
        const res = await updateRestaurant(
          editingRestaurant._id,
          formData
        );

        setRestaurants((prev) =>
          prev.map((r) =>
            r._id === editingRestaurant._id ? res.data : r
          )
        );
      } else {
        const res = await createRestaurant(formData);
        setRestaurants((prev) => [...prev, res.data]);
      }

      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">

      {/* Admin Add Button */}
      {isAdmin && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={openAddModal}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
          >
            + Add Restaurant
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r._id}
            className="relative border rounded-lg shadow hover:shadow-lg transition group"
          >
            <div
              className="cursor-pointer p-4"
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

            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => openEditModal(r, e)}
                  className="bg-blue-500 text-white text-xs px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(r._id);
                  }}
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
              {editingRestaurant ? "Edit Restaurant" : "Add Restaurant"}
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
                type="text"
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
                placeholder="Delivery Time"
                className="w-full border p-2 rounded"
                value={formData.deliveryTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deliveryTime: e.target.value,
                  })
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
                  {editingRestaurant ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;