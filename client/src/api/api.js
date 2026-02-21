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
/*
import axios from "axios";

//const API_URL = "http://localhost:5000/api";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// Axios instance
const API = axios.create({ baseURL: API_URL });

// Restaurant APIs
export const fetchRestaurants = () => API.get("/restaurants");
export const fetchFoodsByRestaurant = (restaurantId) =>
  API.get(`/restaurants/${restaurantId}/foods`);

// Auth header helper

//const API_URL = import.meta.env.VITE_API_URL;

//const API = axios.create({baseURL: API_URL,});

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
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);


export default API;
*/
/*
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
*/


import axios from "axios";
const productionAPI = import.meta.env.VITE_API_URL;
//const developmentAPI = "http://localhost:5000/api"
//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
//Axios instance
const API = axios.create({ 
    baseURL: productionAPI,
});

// Restaurant APIs
//export const fetchRestaurants = () => API.get("/restaurants");
export const fetchRestaurants = () => API.get("/restaurants");

export const fetchFoodsByRestaurant = (id) =>
  API.get(`/restaurants/${id}/foods`);


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Cart APIs
export const getCart = () => API.get("/cart");
export const addCartItem = (food) => API.post("/cart/add", { food });
export const removeCartItem = (foodId) => API.post("/cart/remove", { foodId });
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export default API;


/*
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Restaurant APIs

export const fetchRestaurants = () => API.get("/restaurants");
export const fetchFoodsByRestaurant = (restaurantId) =>
  API.get(`/restaurants/${restaurantId}/foods`);

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

export const getCart = () => API.get("/cart");
export const addCartItem = (food) => API.post("/cart/add", { food });
export const removeCartItem = (foodId) =>
  API.post("/cart/remove", { foodId });

export default API;
*/