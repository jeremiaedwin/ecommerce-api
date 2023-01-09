const Cart = require("../models/Cart");

async function store(req, res){
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(201).send({
            'code':201,
            'status':'OK',
            'data': savedCart
        });
    } catch (error) {
        res.status(500).send({
            'code':500,
            'status': 'Internal Server Error',
            'error' : error
        });
    }
}

async function update(req, res){
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(201).send({
            'code':201,
            'status':'OK',
            'data': updatedCart
        });
    } catch (error) {
        res.status(500).send({
            'code':500,
            'status': 'Internal Server Error',
            'error' : error
        });
    }
}

async function destroy(req, res){
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send({
            'code':200,
            'status':'OK',
            'data': 'Cart has been deleted'
        });
    } catch (error) {
        res.status(500).send({
            'code':500,
            'status': 'Internal Server Error',
            'error' : error
        });
    }
}

async function show(req, res){
    try {
        const cart = await Cart.findOne({userId: req.user.id});
        res.status(200).send({
            'code':200,
            'status':'OK',
            'data': cart
        });
    } catch (error) {
        res.status(500).send({
            'code':500,
            'status': 'Internal Server Error',
            'error' : error
        });
    }
}

async function index(req, res){
    try{
        const carts = await Cart.find();
        res.status(200).send({
            'code':200,
            'status':'OK',
            'data': updatedCart
        });
    } catch (error) {
        res.status(500).send({
            'code':500,
            'status': 'Internal Server Error',
            'error' : error
        });
    }
}

module.exports = {
    store,
    update,
    destroy,
    show,
    index
};