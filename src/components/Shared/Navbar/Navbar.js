import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const [cart] = useCart();

  const navItems = (
    <React.Fragment>
      <li>
        <Link to="/">Homepage</Link>
      </li>

      <li>
        <Link to="/about">About</Link>
      </li>
      {user && (
        <React.Fragment>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </React.Fragment>
      )}

      {user ? (
        <li>
          <button
            onClick={async () => {
              const success = await signOut();
              if (success) {
                toast("You are sign out");
                localStorage.removeItem("accessToken");
              }
            }}
          >
            Sign Out
          </button>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="navbar bg-base-100  ">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          E-MART
        </Link>
      </div>
      <div className="navbar-end">
        <label
          htmlFor="cart-modal"
          className="btn bg-white border-0 text-black hover:bg-white"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-accent badge-sm indicator-item">
              {cart.length}
            </span>
          </div>
        </label>
      </div>
      <div className="navbar-end">
        <label
          tabIndex={2}
          htmlFor="dashboard-drawer"
          className="btn  drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
