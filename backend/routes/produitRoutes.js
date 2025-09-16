const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produitController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");
const validateFields = require("../middleware/validateFields");

const requiredFields = ["name", "price"];

// make a new product (admin only)
router.post(
    "/",
    auth,
    roleCheck(["admin"]),
    validateFields(requiredFields),
    produitController.createProduct
);

// get all products 
router.get("/", produitController.getAllProducts);

// get product by name 
router.get("/search", produitController.getProductByName);

// get product by id 
router.get("/:id", produitController.getProductById);

// update product (admin only)
router.put(
    "/:id",
    auth,
    roleCheck(["admin"]),
    validateFields(requiredFields),
    produitController.updateProduct
);

//delete product (admin only)
router.delete("/:id", auth, roleCheck(["admin"]), produitController.deleteProduct);

module.exports = router;
