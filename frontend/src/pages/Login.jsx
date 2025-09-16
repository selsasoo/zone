import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clientId, setClientId] = useState(localStorage.getItem("clientId")); // state جديد
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/clients/login", {
                email,
                password,
            });

            localStorage.setItem("clientId", res.data.client._id);
            localStorage.setItem("token", res.data.token);

            setClientId(res.data.client._id); // تحديث state
            console.log("ClientId stored in localStorage:", localStorage.getItem("clientId"));
            alert("✅ Login successful!");
            navigate("/"); // أو أي صفحة تريدها
        } catch (err) {
            console.error("Login error:", err);
            alert("❌ Invalid email or password");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("clientId");
        localStorage.removeItem("token");
        setClientId(null); // إعادة تعيين state
        alert("✅ Logged out successfully!");
        navigate("/login");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">{clientId ? "Welcome Back!" : "Login"}</h2>

                {!clientId ? (
                    <form className="login-form" onSubmit={handleLogin}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />

                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </form>
                ) : (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}

                {!clientId && (
                    <p className="signup-link">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
