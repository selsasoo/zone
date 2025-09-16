const Panier = require("../models/Panier");
const Produit = require("../models/Produit");

// get panier by client id
const getPanier = async (req, res) => {
    try {
        const clientId = req.clientId;

        let panier = await Panier.findOne({ client: clientId }).populate("items.produit");

        if (!panier) {
            return res.status(404).json({ message: "Panier not found" });
        }

        res.status(200).json(panier);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// add product to panier
const addToPanier = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { produitId, quantity } = req.body;

        console.log("ClientId:", clientId);
        console.log("ProduitId:", produitId);
        console.log("Quantity:", quantity);

        // validate product existence
        const produit = await Produit.findById(produitId);
        if (!produit) return res.status(404).json({ message: "Produit not found" });

        // find or create panier
        let panier = await Panier.findOne({ client: clientId });
        if (!panier) panier = new Panier({ client: clientId, items: [] });

        if (produit.stock < quantity) return res.status(400).json({ message: "Not enough stock" });

        // check if product already in panier
        const existingItem = panier.items.find(item => item.produit.toString() === produitId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            panier.items.push({ produit: produitId, quantity });
        }

        await panier.save();
        res.status(200).json({ message: "Produit added to panier", panier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// remove product from panier
const removeFromPanier = async (req, res) => {
    try {
        const clientId = req.clientId;
        const { produitId } = req.body;

        let panier = await Panier.findOne({ client: clientId });
        if (!panier) return res.status(404).json({ message: "Panier not found" });

        panier.items = panier.items.filter(item => item.produit.toString() !== produitId);

        await panier.save();
        res.status(200).json({ message: "Produit removed", panier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// clear panier
const clearPanier = async (req, res) => {
    try {
        const clientId = req.clientId;

        let panier = await Panier.findOne({ client: clientId });
        if (!panier) return res.status(404).json({ message: "Panier not found" });

        panier.items = [];
        await panier.save();

        res.status(200).json({ message: "Panier cleared", panier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getPanier,
    addToPanier,
    removeFromPanier,
    clearPanier
};
