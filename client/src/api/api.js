/*import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// =======================
// AUTH HEADER
// =======================
const authHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// =======================
// RESTAURANTS
// =======================
export const fetchRestaurants = () =>
  api.get("/restaurants");

export const fetchFoodsByRestaurant = (restaurantId) =>
  api.get(`/restaurants/${restaurantId}/foods`);

// =======================
// CART
// =======================
export const getCart = () =>
  api.get("/cart", authHeader());

export const addCartItem = (food) =>
  api.post("/cart/add", { food }, authHeader());

export const removeCartItem = (foodId) =>
  api.post("/cart/remove", { foodId }, authHeader());

export default api;
*/

import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Axios instance
const api = axios.create({ baseURL: API_URL });

// Restaurant APIs
export const fetchRestaurants = () => api.get("/restaurants");
export const fetchFoodsByRestaurant = (restaurantId) =>
  api.get(`/restaurants/${restaurantId}/foods`);

// Auth header helper
/*const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};*/

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// Cart APIs
export const getCart = () => API.get("/cart");
export const addCartItem = (food) => API.post("/cart/add", { food });
export const removeCartItem = (foodId) => API.post("/cart/remove", { foodId });
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);


export default api;
