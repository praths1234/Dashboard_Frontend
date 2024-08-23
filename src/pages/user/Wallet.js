import React, { useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
const Wallet = () => {
  const [walletBalance, setWalletBalance] = useState(); 
  //const [qrCodeData, setQrCodeData] = useState('');
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('auth')).user._id;
  useEffect(() => {
      // Fetch the wallet balance using the user ID
      const fetchWalletBalance = async () => {
          try {
              const response = await axios.get(`${process.env.REACT_APP_URI}/wallet/${userId}`);
              console.log(response.data);
              setWalletBalance(response.data.walletBalance);
              console.log(walletBalance);
          } catch (error) {
              console.error('Error fetching wallet balance:', error);
          }
      };

      fetchWalletBalance();
  }, [userId , walletBalance]);
  const handlePaymentDone = () => {
    navigate('/dashboard/user/payment-form');
};
  return (
    <Layout title={"Dashboard - Your Wallet"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
        <div>
            <h3>User Wallet</h3>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>Wallet Balance:</strong> ₹{walletBalance}</p>
            </div>
            <h3>Scan this QR Code:</h3>
            <div>
                <img 
                    src="/qrcode2.jpg" 
                    alt="QR Code" 
                    style={{ width: '200px', height: '200px' }} 
                />
            </div>
            <button onClick={handlePaymentDone} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Payment Done
            </button>
        </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Wallet;