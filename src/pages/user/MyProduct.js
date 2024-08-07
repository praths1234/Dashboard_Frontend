import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import "../../styles/product.css";
const MyProduct = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('auth')).user._id;

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        console.log('Fetching designs for userId:', userId); // Log userId
        const response = await axios.get(`http://localhost:5000/design/user/${userId}`);
        console.log('Response data:', response.data); // Log response data
        setDesigns(response.data);
      } catch (error) {
        console.error('Error fetching designs:', error);
        setError('Error fetching designs. Please check the console for more details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [userId]);

  const handleDelete = async (designId) => {
    try {
      await axios.delete(`http://localhost:5000/design/${designId}`);
      setDesigns(designs.filter(design => design._id !== designId));
    } catch (error) {
      console.error('Error deleting design:', error);
      setError('Error deleting design. Please try again.');
    }
  };

  const handleOrder = (productId, designId) => {
    navigate(`/dashboard/user/shipping/${productId}/${designId}`);
  };
  const handleCreateDesign = () => {
    navigate('/dashboard/user/products');
};
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Layout title={"Dashboard - Your designed Products"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
        <div>
      <h2>My Customized Products</h2>
      <div>
        {designs.length === 0 ? (
          <div>
          <p>No designs found.</p>
          <button onClick={handleCreateDesign}>Create Design</button>
      </div>
        ) : (
          <ul>
            {designs.map((design) => (
              <li key={design._id}>
                <h3>Product ID: {design.productId}</h3>
                <p>Color: {design.color}</p>
                <p>Size: {design.size}</p>
                <p>Text: {design.text}</p>
                <p>Price: {design.price}</p>
                <img src={design.customizedImage} alt="Customized Product" />
                <button onClick={() => handleOrder(design.productId,design._id)}>Order</button>
                <button onClick={() => handleDelete(design._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default MyProduct;