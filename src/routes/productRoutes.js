const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/VerifyToken');

router.post('/', verifyTokenAndAdmin, productController.store);
router.put('/:id', verifyTokenAndAdmin, productController.update);
router.delete('/:id', verifyTokenAndAdmin, productController.destroy);
router.get('/:id', productController.show);
router.get('/', productController.index);

module.exports = router;