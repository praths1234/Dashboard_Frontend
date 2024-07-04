import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import Product from '../../components/Product';
const Products = () => {
  const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product');
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };
        
        fetchProducts();
    }, []);
  return (
    <Layout title={"Dashboard - Products"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
        <div className="product-list">
            {products.map(product => (
                <Product key={product._id} product={product} />
            ))}
        </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Products;