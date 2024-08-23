import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
import '../../styles/AdminOrder.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URI}/orders`);
                setOrders(response.data);
            } catch (error) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Layout title={"Dashboard - Manage Orders"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
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

export default Orders;
