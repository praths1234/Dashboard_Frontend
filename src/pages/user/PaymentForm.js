import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../components/UserMenu';
import Layout from '../../components/Layout';
import toast from "react-hot-toast";
import '../../styles/PaymentForm.css'; 

const PaymentForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userEmail: '',
        paymentReference: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_URI}/submitPaymentForm`, formData);
            if(response.data.success) {
                toast.success(response.data.message, { duration: 15000 });
                toast.success('Your wallet balance will be updated shortly', { duration: 15000 });
            } else {
                toast.error(response.data.message, { duration: 15000 });
            }
             
            setFormData({
                userEmail: '',
                paymentReference: ''
            });
            navigate('/dashboard/user');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit form. Please try again.', { duration: 15000 });
        }
    };

    return (
        <Layout title={"Dashboard - Your Orders"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container">
                            <h4 className="title">Payment Form</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="userEmail">User Email:</label>
                                    <input
                                        type="text"
                                        id="userEmail"
                                        name="userEmail"
                                        value={formData.userEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="paymentReference">Payment Reference Number:</label>
                                    <input
                                        type="text"
                                        id="paymentReference"
                                        name="paymentReference"
                                        value={formData.paymentReference}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-button">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentForm;
