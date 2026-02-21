
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Menu from "./pages/Menu";
import Menu from "./components/Menu";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import FloatingCart from "./components/FloatingCart";
import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import MainLayout from "./layouts/MainLayout";





function App() {
  return (
    <Router>
      
      <FloatingCart />
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/menu/:id" element={<MainLayout><Menu /></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><ProtectedRoute><Checkout /></ProtectedRoute></MainLayout>} />
        <Route path="/orders" element={<MainLayout><ProtectedRoute><Orders /></ProtectedRoute></MainLayout>} />
        <Route path="/cart" element={<MainLayout><ProtectedRoute><Cart /></ProtectedRoute></MainLayout>} />

      </Routes>
    </Router>
  );
}

export default App;

