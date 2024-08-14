import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../components/UserMenu';
import Layout from '../../components/Layout';
const PaymentForm = () => {
    const navigate=useNavigate();
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
            const response = await axios.post('process.env.REACT_URI/submitPaymentForm', formData);
            alert(response.data.message);
            alert('Your wallet balance will be updated shortly'); // Alert success message
            // Optionally, clear the form after successful submission
            setFormData({
                userId: '',
                paymentReference: ''
            });
            navigate('/dashboard/user');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.'); // Alert error message
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
            <div>
            <h4 className="title">Payment Form</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        User Email:
                        <input
                            type="text"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Payment Reference Number:
                        <input
                            type="text"
                            name="paymentReference"
                            value={formData.paymentReference}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                    Submit
                </button>
            </form>
        </div>
            </div>
          </div>
        </div>
        </div>
      </Layout>
    );
};

export default PaymentForm;