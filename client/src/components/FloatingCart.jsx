import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { HiOutlineShoppingCart } from "react-icons/hi";

const FloatingCart = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  // Don't show if cart empty or user not logged in
  if (!user || cartItems.length === 0) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      to="/cart"
      className="fixed bottom-5 right-5 md:hidden bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center justify-center"
    >
      <div className="relative">
        <HiOutlineShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
          {totalItems}
        </span>
      </div>
    </Link>
  );
};

export default FloatingCart;
