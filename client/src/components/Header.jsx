/*import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();          // Clears token & user
    navigate("/login"); // Redirect to login page
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo }
        <Link to="/" className="font-bold text-xl">Food Delivery</Link>

        {/* Desktop Menu }
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>

          {user ? (
            <>
              <Link to="/cart" className="flex items-center hover:text-gray-200 transition">
                <HiOutlineShoppingCart className="mr-1" size={20} />
                Cart ({totalItems})
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
              <Link to="/register" className="hover:text-gray-200 transition">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button }
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <HiOutlineX size={25} /> : <HiOutlineMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu }
      {isOpen && (
        <nav className="md:hidden bg-blue-600 px-4 pt-2 pb-4 space-y-2">
          <Link to="/" onClick={toggleMenu} className="block hover:text-gray-200 transition">Home</Link>

          {user ? (
            <>
              <Link to="/cart" onClick={toggleMenu} className="flex items-center hover:text-gray-200 transition">
                <HiOutlineShoppingCart className="mr-1" size={20} />
                Cart ({totalItems})
              </Link>
              <button
                onClick={() => { handleLogout(); toggleMenu(); }}
                className="block bg-red-500 w-full py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block hover:text-gray-200 transition">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block hover:text-gray-200 transition">Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
*/

/*

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">        
            {/* Logo *}
        <Link to="/" className="font-bold text-xl">
          Food Delivery
        </Link>

        {/* Desktop Menu *}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>

          {user && (
            <Link
              to="/orders"
              className="hover:text-blue-500 transition"
            >
              View Orders
            </Link>
          )}

          <Link to="/cart" className="flex items-center hover:text-blue-500 transition">
            <HiOutlineShoppingCart className="mr-1" size={20} />
            Cart ({totalItems})
          </Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-500 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-500 transition">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button * }
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <HiOutlineX size={25} /> : <HiOutlineMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu *}
      {isOpen && (
        <nav className="md:hidden bg-gray-200 px-4 pt-2 pb-4 space-y-2 text-gray-700">
          <Link to="/" onClick={toggleMenu} className="block hover:text-blue-500 transition">
            Home
          </Link>

          {user && (
            <Link to="/orders" onClick={toggleMenu} className="block hover:text-blue-500 transition">
              View Orders
            </Link>
          )}

          <Link to="/cart" onClick={toggleMenu} className="flex items-center hover:text-blue-500 transition">
            <HiOutlineShoppingCart className="mr-1" size={20} />
            Cart ({totalItems})
          </Link>

          {!user && (
            <>
              <Link to="/login" onClick={toggleMenu} className="block hover:text-gray-200 transition">
                Login
              </Link>
              <Link to="/register" onClick={toggleMenu} className="block hover:text-gray-200 transition">
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;

*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from "react-icons/hi";
//import { useCart } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
//import { AuthContext } from "../context/AuthContext";
import { AuthContext } from "../hooks/AuthContextHook";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Left */ }
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>

          <Link to="/" className="text-xl font-bold text-gray-800">
            FoodDelivery
          </Link>
        </div>

        {/* Desktop Navigation */ }
        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          {user && (
            <Link to="/orders" className="hover:text-orange-500">
              Orders
            </Link>
          )}
        </nav>

        {/* Right Section */ }
        <div className="flex items-center gap-4">

          {/* Cart */ }
          <Link to="/cart" className="relative">
            <HiOutlineShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Section */ }
          {!user ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login" className="text-gray-600 hover:text-black">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="bg-gray-100 px-3 py-2 rounded-lg"
              >
                {user.name || "Account"}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-50 border-t px-4 py-3 space-y-2">
          <Link to="/" className="block">Home</Link>
          {user && <Link to="/orders" className="block">Orders</Link>}
          {!user && (
            <>
              <Link to="/login" className="block">Login</Link>
              <Link to="/register" className="block">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


/*

import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from "react-icons/hi";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Food Delivery</Link>

        {/* Desktop Menu }
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/cart" className="flex items-center hover:text-blue-500 transition">
            <HiOutlineShoppingCart className="mr-1" size={20} /> Cart ({totalItems})
          </Link>

          {user ? (
            <>
              <span className="font-semibold">{user.name}</span>
              <Link to="/orders" className="hover:text-blue-500 transition">View Orders</Link>
              <button onClick={logout} className="hover:text-red-500 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-500 transition">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button }
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <HiOutlineX size={25} /> : <HiOutlineMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu }
      {isOpen && (
        <nav className="md:hidden bg-gray-200 px-4 pt-2 pb-4 space-y-2 text-gray-700">
          <Link to="/" onClick={toggleMenu} className="block hover:text-blue-500 transition">Home</Link>
          <Link to="/cart" onClick={toggleMenu} className="flex items-center hover:text-blue-500 transition">
            <HiOutlineShoppingCart className="mr-1" size={20} /> Cart ({totalItems})
          </Link>

          {user ? (
            <>
              <span className="block font-semibold">{user.name}</span>
              <Link to="/orders" onClick={toggleMenu} className="block hover:text-blue-500 transition">View Orders</Link>
              <button onClick={() => { logout(); toggleMenu(); }} className="block hover:text-red-500 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="block hover:text-blue-500 transition">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="block hover:text-blue-500 transition">Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
*/



