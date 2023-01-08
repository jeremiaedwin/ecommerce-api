const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/VerifyToken');
const { ValidateProduct } = require('../Validator/ProductValidator');

router.post('/', ValidateProduct, verifyTokenAndAdmin, productController.store);
router.put('/:id', ValidateProduct, verifyTokenAndAdmin, productController.update);
router.delete('/:id', verifyTokenAndAdmin, productController.destroy);
router.get('/:id', productController.show);
router.get('/', productController.index);

module.exports = router;