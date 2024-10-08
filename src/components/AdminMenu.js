import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/Menu.css'

function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders-by-date"
            className="list-group-item list-group-item-action"
          >
            Orders by Date Range
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders-by-status"
            className="list-group-item list-group-item-action"
          >
            Orders by Status
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/payments"
            className="list-group-item list-group-item-action"
          >
            Payments(Wallet Recharge Request)
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminMenu