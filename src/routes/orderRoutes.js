const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/VerifyToken');

router.get('/income', verifyTokenAndAdmin, orderController.income);
router.post('/', verifyTokenAndAuthorization, orderController.store);
router.put('/:id', verifyTokenAndAdmin, orderController.update);
router.delete('/:id', verifyTokenAndAdmin, orderController.destroy);
router.get('/:userId', verifyTokenAndAuthorization, orderController.show);
router.get('/', verifyTokenAndAdmin, orderController.index);

module.exports = router;