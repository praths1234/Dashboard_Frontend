import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/auth/ForgotPasswordd';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import Orders from './pages/admin/Orders';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Products from './pages/user/Products';
import MyProduct from './pages/user/MyProduct';
import Order from './pages/user/Order';
import Wallet from './pages/user/Wallet';
import Payments from './pages/admin/Payments';
import ProductDetails from './components/ProductDetails';
import Customizer from './pages/user/Customizer';
import UpdatedProduct from './pages/user/UpdatedProduct';
import ShippingAddress from './pages/user/ShippingAddress';
import PaymentForm from './pages/user/PaymentForm';
function App() {
  return (
    <>
    <Routes>
     <Route path='/' element={<HomePage/>} />
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/forgot-password' element={<ForgotPassword/>}/>
     <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/products" element={<Products />} />
          <Route path='user/products/:id' element={<ProductDetails/>} />
          <Route path='user/customize/:id' element={<Customizer/>} />
          <Route path='user/updatedProduct/:designId' element={<UpdatedProduct/>}/>
          <Route path="user/my-products" element={<MyProduct />} />
          <Route path="user/order" element={<Order/>} />
          <Route path="user/wallet" element={<Wallet />} />
          <Route path='user/shipping/:productId/:designId' element={<ShippingAddress/>} />
          <Route path='user/payment-form' element={<PaymentForm/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/payments" element={<Payments />} />
        </Route>
    </Routes>
    
    </>
  );
}

export default App;
