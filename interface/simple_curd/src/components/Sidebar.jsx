import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, User, ShoppingCart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-full h-16 bg-pink-500/80 flex items-center justify-between shadow-lg z-50
                    md:w-20 md:h-screen md:flex-col md:justify-center md:items-center">
      <Link
        to="/"
        className="flex items-center justify-center w-1/4 md:w-20 h-full md:h-16 md:my-4 text-white hover:bg-white/20 transition-all"
        aria-label="Home"
      >
        <Home className="w-6 h-6" />
      </Link>
      <Link
        to="/search"
        className="flex items-center justify-center w-1/4 md:w-20 h-full md:h-16 md:my-4 text-white hover:bg-white/20 transition-all"
        aria-label="Search"
      >
        <Search className="w-6 h-6" />
      </Link>
      <Link
        to="/profile"
        className="flex items-center justify-center w-1/4 md:w-20 h-full md:h-16 md:my-4 text-white hover:bg-white/20 transition-all"
        aria-label="Profile"
      >
        <User className="w-6 h-6" />
      </Link>
      <Link
        to="/cart"
        className="flex items-center justify-center w-1/4 md:w-20 h-full md:h-16 md:my-4 text-white hover:bg-white/20 transition-all"
        aria-label="Cart"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Sidebar;
