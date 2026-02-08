import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <div className="flex justify-between p-4 shadow">
      <Link to="/">Foodie</Link>
      <div className="flex gap-4">
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
}
