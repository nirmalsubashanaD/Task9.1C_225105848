import React from "react";
import "./Footer.css";
import facebookIcon from '../icons/facebook.jpg';
import twitterIcon from '../icons/twitter.png';
import instagramIcon from '../icons/instagram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            <li>Home</li>
            <li>Questions</li>
            <li>Articles</li>
            <li>Tutorials</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Help</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Stay connected</h3>
          <div className="social-icons">
            <img src={facebookIcon} alt="Facebook" />
            <img src={twitterIcon} alt="Twitter" />
            <img src={instagramIcon} alt="Instagram" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <strong>DEV@Deakin 2025</strong>
        </p>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Code of Conduct</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
