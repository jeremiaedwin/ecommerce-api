const express = require('express');
const router = express.Router();
const user = require('./userRoutes');
const auth = require('./auth');
const product = require('./productRoutes');
const cart = require('./cartRoutes');
const order = require('./orderRoutes');

router.use('/api/user', user);
router.use('/api/auth', auth);
router.use('/api/product', product);
router.use('/api/cart', cart);
router.use('/api/order', order);

module.exports = router