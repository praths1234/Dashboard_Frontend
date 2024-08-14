import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserMenu from './UserMenu';
import Layout from './Layout';
import axios from 'axios';
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`process.env.REACT_URI/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

  return (
    <Layout title={"Dashboard - Product Details"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
        <div className="product-details">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>By {product.brand}</p>
            <p>From USD {product.price}</p>
            <p>From USD {product.premiumPrice} with Printify Premium</p>
            <p>{product.sizes.length} sizes • {product.colors.length} colors • {product.providers} print providers</p>
            
        </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default ProductDetails