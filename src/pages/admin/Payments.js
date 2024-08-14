import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import PaymentModal from './PaymentModal'; // Ensure correct import path
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/PaymentDetails.css'

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPaymentId, setCurrentPaymentId] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('process.env.REACT_URI/submitPaymentForm');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    const handleOpenModal = (paymentId, email) => {
        setCurrentPaymentId(paymentId);
        setCurrentEmail(email);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleUpdateBalance = async (amount) => {
        try {
            const response = await axios.post('process.env.REACT_URI/submitPaymentForm/update-wallet-balance', {
                email: currentEmail,
                amount,
                paymentId: currentPaymentId
            });
            alert(response.data.message);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating wallet balance:', error);
            alert('Failed to update wallet balance. Please try again later.');
        }
    };

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="payment-details">
                            <h2>Payment Details</h2>
                            <div className="payment-list">
                                {payments.map(payment => (
                                    <div key={payment._id} className="payment-item">
                                        <p>User Email: {payment.userEmail}</p>
                                        <p>Payment Reference: {payment.paymentReference}</p>
                                        <p>Status : {payment.statusUpdate}</p>
                                        {payment.statusUpdate !== 'Updated' && (
                                            <button onClick={() => handleOpenModal(payment._id, payment.userEmail)}>
                                                Update Wallet Balance
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentModal
                show={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleUpdateBalance}
                email={currentEmail}
            />
        </Layout>
    );
};

export default Payments;
