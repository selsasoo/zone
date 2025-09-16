import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer" className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        Welcome to <strong>MyZone</strong> – your trusted online shop!
                        We provide quality products with great prices and fast delivery.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: <a href="mailto:selsabilwk@gmail.com">selsabilwk@gmail.com</a></p>
                    <p>Phone: +213 542878611</p>
                    <div className="social-icons">
                        <a href="https://web.facebook.com/?_rdc=1&_rdr"><img src="/assets/facebook.svg" alt="Facebook" width="24" height="24" /></a>
                        <a href="https://www.instagram.com/"><img src="/assets/instagram.svg" alt="Instagram" width="24" height="24" /></a>
                        <a href="https://x.com/"><img src="/assets/twitter.svg" alt="Twitter" width="24" height="24" /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MyZone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

