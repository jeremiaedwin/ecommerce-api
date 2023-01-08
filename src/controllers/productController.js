const Product = require("../models/Product");

async function store(req, res){
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).send({
            'code':201,
            'status':'OK',
            'data': savedProduct
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
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function destroy(req, res){
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'code': 200,
            'Status': 'OK',
            'Message': "Product has been deleted"
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
        const product = await Product.findById(req.params.id);
        console.log(product._id);
        if(product._id == null){
            console.log(test)
            res.status(404).send({
                'code' : 404,
                'status' : 'Data not found',
                'data' : null
            });
        }
        res.status(200).json({
            'code' : 200,
            'status' : 'OK',
            'data': product
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
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const { page = 1, limit = 5 } = req.query;
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            products = await Product.find({categories:{
                $in: [qCategory]
            }});
        }else{
            products = await Product.find().limit(limit * 1).skip((page - 1) * limit).exec();
            counts = await Product.countDocuments();
        }

        res.status(200).json({
            'code':200,
            'status': 'OK',
            'total rows' : counts,
            'current rows' : limit,
            'total pages': Math.ceil(counts / limit),
            'current page': page,
            'data' : products
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