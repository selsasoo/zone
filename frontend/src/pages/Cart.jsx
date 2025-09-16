import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            if (!token) return;
            try {
                const res = await axios.get("http://localhost:5000/api/panier", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(res.data.items || []);
            } catch (err) {
                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [token]);

    const handleRemove = async (produitId) => {
        try {
            await axios.delete("http://localhost:5000/api/panier/remove", {
                headers: { Authorization: `Bearer ${token}` },
                data: { produitId },
            });
            setCartItems(cartItems.filter(item => item.produit._id !== produitId));
        } catch (err) {
            console.error("Error removing item:", err);
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete("http://localhost:5000/api/panier/clear", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems([]);
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.quantity * (item.produit?.price || 0),
        0
    );

    if (!token) return <p className="empty-cart-text">⚠️ Please log in to view your cart.</p>;

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {loading ? (
                <p className="loading-text">Loading cart...</p>
            ) : cartItems.length === 0 ? (
                <p className="empty-cart-text">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.produit?._id || Math.random()} className="cart-item">
                                <img
                                    src={item.produit?.image || "https://via.placeholder.com/100"}
                                    alt={item.produit?.title || item.produit?.name || "Product"}
                                />
                                <div className="item-details">
                                    <h4>{item.produit?.title || item.produit?.name || "Unnamed Product"}</h4>
                                    <p>Price: ${item.produit?.price || "N/A"}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemove(item.produit?._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
                    <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;
