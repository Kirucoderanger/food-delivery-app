import { useContext } from "react";
import { CartContext } from "../context/cart-context";

/*export const useCart = () => {
  return useContext(CartContext);
};
*/


// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};