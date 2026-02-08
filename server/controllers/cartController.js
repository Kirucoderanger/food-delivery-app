/*import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { food } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.foodId.toString() === food._id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      foodId: food._id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
    });
  }

  await cart.save();
  res.json(cart);
};*/

/*export const removeFromCart = async (req, res) => {
  const { foodId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (item) => item.foodId.toString() !== foodId
  );

  await cart.save();
  res.json(cart);
};*/
/*
export const removeFromCart = async (req, res) => {
  const { foodId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (item) => item.foodId.toString() !== foodId
  );

  await cart.save();

  res.json({ items: cart.items }); // ✅ return only items
};

*/


import Cart from "../models/Cart.js";
import Food from "../models/Food.js";

// ✅ Get current user cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.foodId");

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Map items to include food object
    const items = cart.items.map((i) => ({
      _id: i._id,
      foodId: i.foodId._id,
      food: i.foodId,
      quantity: i.quantity,
    }));

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { food } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // Check if food already in cart
    const existingItem = cart.items.find(
      (i) => i.foodId.toString() === food._id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ foodId: food._id, quantity: 1 });
    }

    await cart.save();
    await cart.populate("items.foodId");

    const items = cart.items.map((i) => ({
      _id: i._id,
      foodId: i.foodId._id,
      food: i.foodId,
      quantity: i.quantity,
    }));

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add item" });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.foodId.toString() !== foodId
    );

    await cart.save();
    await cart.populate("items.foodId");

    const items = cart.items.map((i) => ({
      _id: i._id,
      foodId: i.foodId._id,
      food: i.foodId,
      quantity: i.quantity,
    }));

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
