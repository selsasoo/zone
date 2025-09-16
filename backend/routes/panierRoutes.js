const express = require("express");
const router = express.Router();
const {
    getPanier,
    addToPanier,
    removeFromPanier,
    clearPanier,
} = require("../controllers/panierController");
const auth = require("../middleware/auth");

router.use(auth);

// add product to panier
router.post("/add", addToPanier);

// remove product from panier
router.delete("/remove", removeFromPanier);

// clear panier
router.delete("/clear", clearPanier);

// get panier by logged-in client
router.get("/", getPanier);

module.exports = router;

