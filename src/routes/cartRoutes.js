const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/VerifyToken');

router.post('/', verifyTokenAndAuthorization, cartController.store);
router.put('/:id', verifyTokenAndAuthorization, cartController.update);
router.delete('/:id', verifyTokenAndAuthorization, cartController.destroy);
router.get('/:userId', verifyTokenAndAuthorization, cartController.show);
router.get('/', verifyTokenAndAdmin, cartController.index);

module.exports = router;