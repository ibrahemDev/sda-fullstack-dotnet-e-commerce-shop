import { useAuthenticationActions } from '@/context/auth/actions/useAuthenticationActions';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { FaShoppingCart } from "react-icons/fa";

/**
 * Navigation bar component.
 *
 * @returns {JSX.Element} - The rendered Navbar component.
 */
function Navbar() {
  // Get authentication actions and state
  const {
    token,
    isLoggedIn,
    isAdmin,
    userId,
    logout,
  } = useAuthenticationActions();

  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 gap-1 shadow-md justify-between">
      {/* Left side of the navbar (brand and main navigation) */}
      <div className="navbar-start lg:w-auto">
        {/* Mobile menu (hamburger icon and dropdown) */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Button variant={"link"} onClick={() => {
              navigate('/products');
            }}>Products</Button></li>

          </ul>
        </div>
        {/* Website brand/logo */}
        <Link to={"/"} className="btn btn-ghost text-xl">
          variety shop
        </Link>
        {/* Main navigation links (hidden on mobile) */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex ">
          <li><Button variant={"link"} onClick={() => {
            navigate('/products');
          }}>Products</Button></li>

        </ul>
      </div>

      {/* Centered content (search bar and filter button) - hidden on mobile */}
      <div className="navbar-center hidden lg:flex lg:flex-auto gap-1">
        {/* Add search bar or other components here */}
      </div>

      {/* Right side of the navbar (authentication controls) */}
      {isLoggedIn ? (
        <>
          {/* User is logged in - show cart and user menu */}
          <Button variant={"ghost"} onClick={() => {
            navigate('/cart');
          }} >
            <FaShoppingCart className="h-4 w-4 text-gray-500" />
          </Button>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
              {/* User avatar (replace with actual avatar logic) */}
              <svg viewBox="0 0 64 64" fill="currentColor" className="h-8 w-8 text-gray-500">
                <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {/* Show "Dashboard" link only if user is an admin */}
              {isAdmin && (
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
              )}
              {/* Logout button */}
              <li role='button' onClick={logout} tabIndex={0} className='bg-red-500 text-white rounded-lg'>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        // User is not logged in - show login and register buttons
        <div className="flex navbar-end lg:w-auto">
          {/* Login button */}
          <Link to={"/login"} role='button' className="btn btn-primary mx-2">Login</Link>
          {/* Register button */}
          <Link to={"/register"} role='button' className="btn btn-outline btn-info mx-2">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
