import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
//import './Orders.css'; // Assuming you have a CSS file for custom styles

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('process.env.REACT_URI/orders');
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
            await axios.patch(`process.env.REACT_URI/orders/updateStatus/${orderId}`, { status: newStatus });
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
                        {orders.map((order) => (
                            <div key={order._id} className="order-card">
                                <div className="order-info">
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>User ID:</strong> {order.userId}</p>
                                    <p><strong>User Email:</strong> {order.userEmail}</p>
                                    <h3>Product ID: {order.productDetails._id}</h3>
                                    <p>Status: {order.status}</p>
                                   <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                    <img 
                                   src={order.designId ? order.productDetails.customizedImage : order.productDetails.imageUrl} 
                                    alt="Product" 
                                    />
                                </div>
                                <div className="order-actions">
                                    {order.status === 'Cancelled' ? (
                                        <p>{order.status}</p>
                                    ) : (
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
