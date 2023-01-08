const {check, validationResult} = require('express-validator');

exports.ValidateProduct = [
    check('title').exists().withMessage('Title name can not be empty!').isString().withMessage('Title must be String!'),
    check('desc').exists().withMessage('Desc name can not be empty!'),
    check('categories').exists().withMessage('Categories name can not be empty!'),
    check('size').exists().withMessage('Size name can not be empty!'),
    check('color').exists().withMessage('Color name can not be empty!'),
    check('price').isFloat().withMessage('Price must be Number!').exists().withMessage('Price name can not be empty!'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                code: 422,
                status : "Unprocessable Entity response",
                errors: errors.array()
            });
        }else{
            next();
        }
    },
];