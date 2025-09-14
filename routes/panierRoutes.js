const express = require("express");
const router = express.Router();

const {
    getPanier,
    addToPanier,
    removeFromPanier,
    clearPanier,
} = require("../controllers/panierController");

// get panier by client id 
router.get("/:clientId", getPanier);

// add product to panier
router.post("/add", addToPanier);

// remove product
router.delete("/remove", removeFromPanier);

// clear panier
router.delete("/clear", clearPanier);


module.exports = router;
