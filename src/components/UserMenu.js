import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/Menu.css'
function UserMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>User Services
          </h4>
          <NavLink
            to="/dashboard/user/products"
            className="list-group-item list-group-item-action"
          >
           Products
          </NavLink>
          <NavLink
            to="/dashboard/user/my-products"
            className="list-group-item list-group-item-action"
          >
            My Products
          </NavLink>
          <NavLink
            to="/dashboard/user/order"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/wallet"
            className="list-group-item list-group-item-action"
          >
            Wallet
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default UserMenu;