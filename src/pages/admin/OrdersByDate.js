import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import '../../styles/AdminOrder.css'

const OrdersByDateRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orders, setOrders] = useState([]);
  
  const fetchOrdersByDateRange = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URI}/orders/by-date-range`, {
        startDate,
        endDate
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        await axios.patch(`${process.env.REACT_APP_URI}/orders/updateStatus/${orderId}`, { status: newStatus });
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};


  return (
    <Layout title={"Dashboard - Orders by Date Range"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Orders by Date Range</h2>
            <div className="mb-3">
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="form-control"
              />
            </div>
            <button onClick={fetchOrdersByDateRange} className="btn btn-primary">Fetch Orders</button>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order._id}>
                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>User ID:</strong> {order.userId}</p>
                                    <p><strong>User Email:</strong> {order.userEmail}</p>
                                    <p>Product ID: {order.productDetails._id}</p>
                                    <p><strong>Status: {order.status}</strong></p>
                                    <div className="order-actions">
                                    {((order.status === 'Cancelled')|| order.status ==='Delivered') ? (
                                        <p></p>
                                    ) : (
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    )}
                                </div>
                    <img 
                                   src={order.designId ? order.productDetails.customizedImage : order.productDetails.imageUrl} 
                                    alt="Product" 
                                    />
                    
                    
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

export default OrdersByDateRange;
