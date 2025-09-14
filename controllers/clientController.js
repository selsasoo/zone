const Client = require("../models/Client");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password, phone } = req.body;

            // find email 
        const existingEmail = await Client.findOne({ Email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // find username 
        const existingUsername = await Client.findOne({ Username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newClient = new Client({
            name,
            Username: username,
            Email: email,
            password,  
            phone
        });

        await newClient.save();
        res.status(201).json({ message: "Client registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
         
        // find client by email 
        const client = await Client.findOne({ Email: email });
        if (!client) return res.status(400).json({ message: "Invalid email or password" });

         // compare password 
        const isMatch = await client.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // make a token 
        const token = jwt.sign(
            { id: client._id, role: client.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            client: {
                id: client._id,
                name: client.name,
                username: client.Username,
                email: client.Email,
                phone: client.phone,
                role: client.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

getProfile = async (req, res) => {
    try {
        const client = await Client.findById(req.clientId).populate("panier");
        if (!client) return res.status(404).json({ message: "Client not found" });

        res.status(200).json({
            id: client._id,
            name: client.name,
            username: client.Username,
            email: client.Email,
            phone: client.phone,
            role: client.role,
            panier: client.panier
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

updateProfile = async (req, res) => {
    try {
        const client = await Client.findById(req.clientId);
        if (!client) return res.status(404).json({ message: "Client not found" });

        const { name, username, phone, password } = req.body;

        if (name) client.name = name;
        if (username) {
             // verify unique username 
            const existingUsername = await Client.findOne({ Username: username, _id: { $ne: client._id } });
            if (existingUsername) return res.status(400).json({ message: "Username already exists" });
            client.Username = username;
        }
        if (phone) client.phone = phone;
        if (password) client.password = password;  

        await client.save();
        res.status(200).json({ message: "Profile updated successfully", client });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
module.exports = { registerUser, loginUser, getProfile, updateProfile };