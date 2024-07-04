import React, { useState , useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/authStyle.css";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();
    useEffect(() => {
        const auuth = localStorage.getItem('auth');
        if(auuth){
          navigate('/');
        }
      })
    // form function
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5000/auth/forgot-password", {
          email,
          newPassword,
          answer,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message , { duration: 5000 });
          alert("Password reset successfully");
  
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong" , { duration: 5000 });
      }
    };
    return (
      <Layout title={"Forgot Password - Ecommerce APP"}>
        <div className="form-container ">
          <form onSubmit={handleSubmit}>
            <h4 className="title">RESET PASSWORD</h4>
  
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Name your School "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
  
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          </form>
        </div>
      </Layout>
    );
  };
  
  export default ForgotPassword;