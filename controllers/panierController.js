const Panier = require("../models/panierModel");
const Produit = require("../models/produitModel");

// get panier by client id 
const getPanier = async (req, res) => {
    try {
        const { clientId } = req.params;

                   // search for the panier and populate product details 
        let panier = await Panier.findOne({ client: clientId }).populate("items.produit");

        if (!panier) {
            return res.status(404).json({ message: "Panier not found" });
        }

        res.status(200).json(panier);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// add product to panier
const addToPanier = async (req, res) => {
    try {
        const { clientId, produitId, quantity } = req.body;

        // validate product existence 
        const produit = await Produit.findById(produitId);
        if (!produit) {
            return res.status(404).json({ message: "Produit not found" });
        }

        // find or create panier for the client 
        let panier = await Panier.findOne({ client: clientId });
        if (!panier) {
            panier = new Panier({ client: clientId, items: [] });
        }

         // check if product already in panier and update quantity 
        const existingItem = panier.items.find(
            (item) => item.produit.toString() === produitId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
               // if not existing, add new item
            panier.items.push({ produit: produitId, quantity });
        }

        await panier.save();
        res.status(200).json({ message: "Produit added to panier", panier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// remove product from panier
const removeFromPanier = async (req, res) => {
    try {
        const { clientId, produitId } = req.body;

        let panier = await Panier.findOne({ client: clientId });
        if (!panier) {
            return res.status(404).json({ message: "Panier not found" });
        }

         // filter out the product to be removed 
        panier.items = panier.items.filter(
            (item) => item.produit.toString() !== produitId
        );

        await panier.save();
        res.status(200).json({ message: "Produit removed", panier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// clear panier
const clearPanier = async (req, res) => {
    try {
        const { clientId } = req.body;

        let panier = await Panier.findOne({ client: clientId });
        if (!panier) {
            return res.status(404).json({ message: "Panier not found" });
        }

        panier.items = []; // clear all items
        await panier.save();

        res.status(200).json({ message: "Panier cleared", panier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = {
    getPanier,
    addToPanier,
    removeFromPanier,
    clearPanier
};
