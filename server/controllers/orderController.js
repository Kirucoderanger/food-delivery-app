import Order from "../models/Order.js";
import Cart from "../models/Cart.js"; // optional: clear cart after order

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, totalPrice } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const order = new Order({
      user: userId,
      items,
      deliveryAddress,
      totalPrice,
    });

    await order.save();

    // Optional: clear cart
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

// Get orders for user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
