const Order = require("../models/Order");

async function store(req, res){
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).send({
            'code': 201,
            'status': 'OK',
            'data': savedOrder
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
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(201).send({
            'code': 201,
            'status': 'OK',
            'data': savedOrder
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
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send({
            'code': 200,
            'status': 'OK',
            'data': 'Data has been deleted!'
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
        const Orders = await Order.find({userId: req.user.id});
        res.status(200).send({
            'code': 200,
            'status': 'OK',
            'data': Orders
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
        const Orders = await Order.find();
        res.status(200).send({
            'code': 200,
            'status': 'OK',
            'data': Orders
        });
    } catch (error) {
        res.status(500).send({
            'code':500,
            'status': 'Internal Server Error',
            'error' : error
        });
    }
}

async function income(req, res){
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
            },
        },
        {
            $group: {
            _id: "$month",
            total: { $sum: "$sales" },
            },
        },
        ]);
        res.status(200).json(income);
    } catch (err) {
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
    index,
    income
};