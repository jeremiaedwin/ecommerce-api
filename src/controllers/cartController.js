const Cart = require("../models/Cart");

async function store(req, res){
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function update(req, res){
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function destroy(req, res){
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

async function show(req, res){
    try {
        const cart = await Cart.findOne({userId: req.user.id});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function index(req, res){
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    store,
    update,
    destroy,
    show,
    index
};