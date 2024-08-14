import React , {useState , useEffect} from "react";
import Layout from "../../components/Layout";
import "../../styles/authStyle.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup =  () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer , setAnswer] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      const auuth = localStorage.getItem('auth');
      if(auuth){
        navigate('/');
      }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("process.env.REACT_URI/auth/register", {
            name,
            email,
            password,
            phone,
            address,
            answer,
          });
          if (res && res.data.success) {
            toast.success(res.data&&res.data.message);
            //alert(res.data && res.data.message);
            navigate("/login");
          } else {
            toast.error(res.data.message , { duration: 15000 });
            //alert(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong" , { duration: 15000 });
        }
      };  
    return(
        <Layout title="Signup">
         <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">SIGNUP FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
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
              placeholder="Name your school(Security Question)"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
        </Layout>
    )
}
export default Signup;