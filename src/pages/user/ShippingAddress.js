import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import "../../styles/shippingAddressStyle.css";

const ShippingAddress = () => {
  const [flatNumber, setFlatNumber] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [walletBalance, setWalletBalance] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { productId, designId } = useParams();
  const userId = JSON.parse(localStorage.getItem('auth')).user._id;

  useEffect(() => {
    // Fetch the wallet balance using the user ID
    const fetchWalletBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/wallet/${userId}`);
            console.log(response.data);
            setWalletBalance(response.data.walletBalance);
            console.log(walletBalance);
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
        }
    };

    fetchWalletBalance();
}, [userId , walletBalance]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const shippingAddress = `${flatNumber}, ${locality}, ${landmark}, ${city}, ${pinCode}`;
    try {
      let productPrice;
  
      if (designId) {
          // Fetch product price using productId and designId
          const productResponse = await axios.get(`http://localhost:5000/design/${designId}`);
          productPrice = productResponse.data.price;
      } else {
          // Fetch product price using only productId
          const productResponse = await axios.get(`http://localhost:5000/product/${productId}`);
          productPrice = productResponse.data.price;
      } 
      if (walletBalance < productPrice) {
        // Show pop-up or alert to recharge wallet
        alert('Insufficient balance. Please recharge your wallet.');
        navigate('/wallet');
    }
    else{
      const updatedBalance = walletBalance - productPrice;

      // Update wallet balance in the database
      await axios.patch(`http://localhost:5000/wallet/${userId}`, { balance: updatedBalance });
      await axios.post('http://localhost:5000/orders', { userId, productId, designId, shippingAddress });

        // Update local wallet balance state
        setWalletBalance(updatedBalance);

        // Show success message
        alert('Order placed successfully!');
        navigate('/');
    }
} catch (error) {
    console.error('Error placing order:', error);
    setError('Error placing order. Please try again.');
}
  };
  return (
    <Layout title={"Dashboard - Shipping Address"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h4 className="title">Shipping Address</h4>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Flat Number:</label>
                  <input
                    type="text"
                    value={flatNumber}
                    onChange={(e) => setFlatNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Locality or Colony:</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Nearest Landmark:</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>PIN Code:</label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Place Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingAddress;
