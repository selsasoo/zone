import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // backend
                const myProductsRes = await fetch("http://localhost:5000/api/products");
                const myProducts = myProductsRes.ok ? await myProductsRes.json() : [];
                console.log("Backend Products:", myProducts);

                // external API
                const externalRes = await fetch("https://fakestoreapi.com/products");
                const externalProducts = await externalRes.json();
                console.log("External Products:", externalProducts);

                setProducts([...myProducts, ...externalProducts]);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // add product to cart
    const addToCart = async (product) => {
        const token = localStorage.getItem("token"); 
        if (!token) {
            alert("⚠️ You must log in first to add products to the cart.");
            return;
        }

        
        if (!product._id) {
            alert("⚠️ Cannot add external products to cart.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/panier/add",
                {
                    produitId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            alert("✅ Product added to cart!");
        } catch (err) {
            console.error("Error adding to cart:", err.response || err);
            alert("❌ Error adding product to cart.");
        }
    };


    return (
        <div className="products-container">
            <h1 className="products-title">Products</h1>

            {loading ? (
                <p className="loading-text">Loading products...</p>
            ) : products.length > 0 ? (
                <div className="products-grid">
                    {products.map((product, index) => (
                        <div
                            key={product._id || product.id || index}
                            className="product-card"
                        >
                            <img
                                src={product.image || "https://via.placeholder.com/200"}
                                alt={product.title || product.name}
                                className="product-image"
                            />
                            <h3 className="product-name">{product.title || product.name}</h3>
                            <p className="product-description">
                                {(product.description || "").slice(0, 80)}...
                            </p>
                            <strong className="product-price">${product.price || "N/A"}</strong>

                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(product)}
                            >
                                🛒 Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-products">No products available yet.</p>
            )}
        </div>
    );
};

export default Products;
