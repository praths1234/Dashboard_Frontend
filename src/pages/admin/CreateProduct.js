import React , {useState} from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import '../../styles/CreateProductStyles.css';
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    name: '',
    brand: '',
    price: '',
    sizes: '',
    colors: '',
    description: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      sizes: formData.sizes.split(',').map(size => size.trim()),
      colors: formData.colors.split(',').map(color => color.trim()),
    };
    axios.post('http://localhost:5000/product', data)
      .then(response => {
        console.log('Product created:', response.data);
        alert("Product Created");
        // Reset form or show success message
      })
      .catch(error => {
        console.error('There was an error creating the product!', error);
      });
  };

    return (
        <Layout title={"Dashboard - Create Product"}>
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu />
              </div>
              <div className="col-md-9">
              <form onSubmit={handleSubmit} className="create-product-form">
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
      </label>
              <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Brand:
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <label>
        Sizes (comma separated):
        <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} required />
      </label>
      <label>
        Colors (comma separated):
        <input type="text" name="colors" value={formData.colors} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <button type="submit">Create Product</button>
    </form>
              </div>
            </div>
          </div>
        </Layout>
      );
}

export default CreateProduct;