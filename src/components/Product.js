import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/product.css';
 
const Product = ({ product }) => {
    const navigate = useNavigate();
    

    const handleCustomize = () => {
        try {
            console.log("Product in handleCustomize:", product);
            navigate(`/dashboard/user/customize/${product._id}`);
        } catch (error) {
            console.error("Error", error);
        }
    };
    
    const handleViewDetails = () => {
        console.log("Product in handleViewDetails:", product);
        navigate(`/dashboard/user/products/${product._id}`);
    };
    
    
    

    return (
        <div className="product">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-hover-options">
                    <button className="option-button" onClick={handleCustomize}>Customize</button>
                    <button className="option-button" onClick={handleViewDetails}>View Details</button>
                    
                </div>
            </div>
            {product.isBestseller && <div className="badge">Bestseller</div>}
            {product.isFeatured && <div className="badge">Featured</div>}
            <h2>{product.name}</h2>
            <p>By {product.brand}</p>
            <p>From ₹ {product.price}</p>
            <p>{product.sizes.length} sizes • {product.colors.length} colors • {product.providers} print providers</p>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
        
    }).isRequired
};

export default Product;