import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log({ name, username, email, password, phone });

        try {
            const res = await axios.post("http://localhost:5000/api/clients/register", {
                name,
                username,
                email,
                phone,
                password
            });

            if (res.data.client && res.data.client.id) {
                localStorage.setItem("clientId", res.data.client.id);
                if (res.data.token) localStorage.setItem("token", res.data.token);
            }

            alert("✅ Registration successful! You are now logged in.");
            navigate("/"); 
        } catch (err) {
            console.error("Registration error:", err.response || err);
            const msg = err.response?.data?.message || "Registration failed. Please check your input.";
            alert("❌ " + msg);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="register-btn">Register</button>
            </form>

            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;