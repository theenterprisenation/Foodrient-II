import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Store, Package, Users, BarChart, ShoppingBasket, ShoppingCart, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const { items, total } = useCartStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Primary Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-2xl font-bold text-neutral-900">Foodrient</span>
            </Link>
          </div>

          {/* Public Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            <Link
              to="/group-buys"
              className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Group Buys
            </Link>
            <Link
              to="/deals"
              className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Deals/Produce
            </Link>
            <Link
              to="/about"
              className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              FAQ
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/messages"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <MessageSquare className="h-5 w-5 mr-1" />
                  Messages
                </Link>
                <Link
                  to="/vendor/dashboard"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Store className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/vendor/products"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <ShoppingBasket className="h-5 w-5 mr-1" />
                  Products
                </Link>
                <Link
                  to="/vendor/orders"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Package className="h-5 w-5 mr-1" />
                  Orders
                </Link>
                <Link
                  to="/vendor/customers"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Users className="h-5 w-5 mr-1" />
                  Customers
                </Link>
                <Link
                  to="/vendor/analytics"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <BarChart className="h-5 w-5 mr-1" />
                  Analytics
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/cart"
                  className="text-neutral-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <span className="ml-2">₦{total().toLocaleString()}</span>
                </Link>
                <Link
                  to="/auth"
                  className="flex items-center text-neutral-700 hover:text-yellow-500"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span className="text-xs">Sign In / Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;