import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css'
const Footer = () => {
    return (
        <div className="footer footer-expand-lg footer-dark bg-dark text-center p-3">
            <h1 className="text-light mb-3">Print on Demand</h1>
            <div className="d-flex justify-content-center mb-3">
                <a href="https://www.linkedin.com/company/faburn/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
                    <FaLinkedin size={30} />
                </a>
                <a href="https://www.instagram.com/thefaburn" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
                    <FaInstagram size={30} />
                </a>
            </div>
            <div>
                <a href="https://www.faburn.com/privacy-policy/" className="text-light">
                    Privacy Policy
                </a>
            </div>
        </div>
    );
}

export default Footer;
