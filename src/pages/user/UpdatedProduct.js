import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';

const UpdatedProduct = () => {
  const { designId } = useParams();
  const [design, setDesign] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Design ID:', designId); // Log designId to ensure it is not undefined
    const fetchDesign = async () => {
      try {
        const response = await axios.get(`process.env.REACT_URI/design/${designId}`);
        console.log('Design data:', response.data);
        setDesign(response.data);
      } catch (error) {
        console.error('Error fetching design:', error);
      }
    };

    if (designId) {
      fetchDesign();
    }
  }, [designId]);

  const handleOrder = (productId, designId) => {
    if (quantity <= 0) {
      alert('Quantity must be greater than zero.');
      return;
    }
    navigate(`/dashboard/user/shipping/${productId}/${designId}`, { state: { quantity } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`process.env.REACT_URI/design/${designId}`);
      console.log('Design deleted:', designId);
      alert('Design deleted successfully!');
      navigate('/dashboard/user/products');
    } catch (error) {
      console.error('Error deleting design:', error);
      alert('Failed to delete the design.');
    }
  };

  if (!design) {
    return <div>Loading...</div>;
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
              <h1>Customized Product</h1>
              <div>
                <h2>Product Details</h2>
                <p><strong>Color:</strong> {design.color}</p>
                <p><strong>Size:</strong> {design.size}</p>
                <p><strong>Text:</strong> <div dangerouslySetInnerHTML={{ __html: design.text }} /></p>
                <p><strong>Text Position:</strong> {JSON.stringify(design.textPosition)}</p>
                <p><strong>Image Position:</strong> {JSON.stringify(design.imagePosition)}</p>
              </div>
              <div>
                <h2>Customized Image</h2>
                {design.customizedImage && (
                  <img src={design.customizedImage} alt="Customized Product" />
                )}
                <div>
                          <label>
                            Quantity:
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(parseInt(e.target.value))}
                              min="1"
                            />
                          </label>
                        </div>
              </div>
              <button onClick={() => handleOrder(design.productId, design._id)}>Order Now</button>
              <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdatedProduct;
