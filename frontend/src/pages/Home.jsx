import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <header className="hero-section">
                <h1>Welcome to MyZone</h1>
                <p>Your one-stop shop for all your needs.</p>
                <a href="/products" className="cta-button">Shop Now</a>
            </header>

            <section className="features">
                <div className="feature">
                    <img src="/assets/delivery.svg" alt="Fast Delivery" />
                    <h3>Fast Delivery</h3>
                    <p>We deliver your products quickly and safely.</p>
                </div>
                <div className="feature">
                    <img src="/assets/quality.svg" alt="Best Quality" />
                    <h3>Top Quality</h3>
                    <p>Only the best products handpicked for you.</p>
                </div>
                <div className="feature">
                    <img src="/assets/support.svg" alt="Customer Support" />
                    <h3>24/7 Support</h3>
                    <p>Always here to help you with any questions.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
