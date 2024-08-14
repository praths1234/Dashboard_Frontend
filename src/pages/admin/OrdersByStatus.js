import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';

const OrdersByStatus = () => {
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([]);

  const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const fetchOrdersByStatus = async () => {
    try {
      const response = await axios.get(`process.env.REACT_URI/orders/by-status/${status}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Layout title={"Dashboard - Orders by Status"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Orders by Status</h2>
            <div className="mb-3">
              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control"
              >
                <option value="">Select Status</option>
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button onClick={fetchOrdersByStatus} className="btn btn-primary">Fetch Orders</button>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order._id}>
                    <p>Name: {order.userEmail}</p>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Product: {order.productDetails.name}</p>
                    <p>Address: {order.shippingAddress}</p>
                    <p>Status: {order.status}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersByStatus;
