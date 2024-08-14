import React ,{useState , useEffect} from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/authStyle.css";
import { useAuth } from "../../context/auth";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth , setAuth] = useAuth("");
    const navigate = useNavigate();
    const location = useLocation(); 
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
        const res = await axios.post("process.env.REACT_URI/auth/login", {
          email,
          password,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message , { duration: 50000 });
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          //alert("Logged in successfully");
          navigate(location.state?.from ||"/");
        } else {
          //alert('User not found');
          toast.error(res.data.message , { duration: 15000 });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong" , { duration: 15000 });
      }
    };
    return (
      <Layout title="Register - Ecommer App">
        <div className="form-container ">
          <form onSubmit={handleSubmit}>
            <h4 className="title">LOGIN FORM</h4>
  
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </form>
        </div>
      </Layout>
    );
  };
  
  export default Login;