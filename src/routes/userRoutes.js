const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/VerifyToken');

router.get('/stats', verifyTokenAndAdmin, userController.stats);
router.put('/:id', verifyTokenAndAuthorization, userController.update);
router.delete('/:id', verifyTokenAndAuthorization, userController.destroy);
router.get('/:id', verifyTokenAndAdmin, userController.show);
router.get('/', verifyTokenAndAdmin, userController.index);

module.exports = router;