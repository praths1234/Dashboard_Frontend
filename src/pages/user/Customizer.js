import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import ReactQuill from 'react-quill';
import * as html2canvas from 'html2canvas';
import 'react-quill/dist/quill.snow.css';
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import '../../styles/CustomizerPage.css';
const Customizer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const uId = JSON.parse(localStorage.getItem('auth')).user._id;
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('#FFFFFF');
  const [size, setSize] = useState('XS');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0, width: 200, height: 100, rotate: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0, width: 200, height: 200, rotate: 0 });
  const [fontSize, setFontSize] = useState(16);
  const previewRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URI}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveText = () => {
    setText('');
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleTextRotationChange = (e) => {
    setTextPosition({ ...textPosition, rotate: e.target.value });
  };

  const handleImageRotationChange = (e) => {
    setImagePosition({ ...imagePosition, rotate: e.target.value });
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let customizedImage = null;

    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, { useCORS: true });
      customizedImage = canvas.toDataURL('image/jpeg', 0.95);
    }

    const formData = new FormData();
    formData.append('userId', uId);
    formData.append('productId', id);
    formData.append('text', text);
    formData.append('color', color);
    formData.append('size', size);
    formData.append('image', image);
    formData.append('textPosition', JSON.stringify(textPosition));
    formData.append('imagePosition', JSON.stringify(imagePosition));
    formData.append('customizedImage', customizedImage);
    formData.append('price', product.price);

    try {
      const response = await axios.post(`${process.env.REACT_APP_URI}/design`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate(`/dashboard/user/updatedProduct/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title={"Dashboard - Product Customization"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>
              {product && (
                <>
                  <h1>Customize {product.name}</h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Color:</label>
                      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>
                    <div>
                      <label>Size:</label>
                      <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="3XL">3XL</option>
                        <option value="4XL">4XL</option>
                      </select>
                    </div>
                    <div>
                      <label>Text:</label>
                      <ReactQuill
                        value={text}
                        onChange={setText}
                        modules={{
                          toolbar: [
                            [{ 'font': [] }, { 'size': [] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        formats={[
                          'font', 'size',
                          'bold', 'italic', 'underline', 'strike',
                          'color', 'background',
                          'script',
                          'link', 'image', 'video'
                        ]}
                      />
                      {text && (
                        <button type="button" onClick={handleRemoveText}>
                          Remove Text
                        </button>
                      )}
                    </div>
                    <div>
                      <label>Image:</label>
                      <input type="file" accept="image/*" onChange={handleImageUpload} />
                      {preview && (
                        <button type="button" onClick={handleRemoveImage}>
                          Remove Image
                        </button>
                      )}
                    </div>
                    <div>
                      <label>Text Rotation:</label>
                      <input
                        type="number"
                        value={textPosition.rotate}
                        onChange={handleTextRotationChange}
                        min="0"
                        max="360"
                      />
                    </div>
                    <div>
                      <label>Image Rotation:</label>
                      <input
                        type="number"
                        value={imagePosition.rotate}
                        onChange={handleImageRotationChange}
                        min="0"
                        max="360"
                      />
                    </div>
                    <div>
                      <label>Font Size:</label>
                      <input
                        type="number"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        min="10"
                        max="100"
                      />
                    </div>
                    <button type="submit">Save Customization</button>
                  </form>
                  <div>
                    <h2>Preview</h2>
                    <div
                      ref={previewRef}
                      style={{
                        position: 'relative',
                        width: '400px',
                        height: '600px',
                        background: `url(${product.imageUrl}) center center / contain no-repeat,lightblue`,
                        backgroundColor: color,
                        border: '1px solid #ccc',
                        margin: '0 auto'
                      }}
                    >
                      {text && (
                        <Rnd
                          bounds="parent"
                          size={{ width: textPosition.width, height: textPosition.height }}
                          position={{ x: textPosition.x, y: textPosition.y }}
                          onDragStop={(e, d) => setTextPosition({ ...textPosition, x: d.x, y: d.y })}
                          onResizeStop={(e, direction, ref, delta, position) => {
                            setTextPosition({
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              ...position
                            });
                          }}
                          style={{
                            transform: `rotate(${textPosition.rotate}deg)`,
                            display: 'inline-block',
                          }}
                        >
                          <div
                            style={{
                              padding: '5px',
                              background: 'rgba(255, 255, 255, 0.7)',
                              cursor: 'move',
                              userSelect: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: `${fontSize}px`,
                              color: 'black',
                              transform: `rotate(${textPosition.rotate}deg)`,
                              width: 'auto',
                              height: 'auto',
                            }}
                            dangerouslySetInnerHTML={{ __html: text }}
                          />
                        </Rnd>
                      )}
                      {preview && (
                        <Rnd
                          bounds="parent"
                          size={{ width: imagePosition.width, height: imagePosition.height }}
                          position={{ x: imagePosition.x, y: imagePosition.y }}
                          onDragStop={(e, d) => setImagePosition({ ...imagePosition, x: d.x, y: d.y })}
                          onResizeStop={(e, direction, ref, delta, position) => {
                            setImagePosition({
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              ...position
                            });
                          }}
                          style={{
                            transform: `rotate(${imagePosition.rotate}deg)`,
                            display: 'inline-block',
                          }}
                        >
                          <img
                            src={preview}
                            alt="Preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              transform: `rotate(${imagePosition.rotate}deg)`,
                            }}
                          />
                        </Rnd>
                      )}
                    </div>
                  </div>
                  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customizer;