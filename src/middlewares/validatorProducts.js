const { check , validationResult } = require('express-validator');
const path = require('path');

let fileOld = {};

const validateProduct = [
    check('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    check('price').notEmpty().withMessage('El precio del producto es obligatorio'),
    check('discount').notEmpty().withMessage('El descuento es obligatorio'),
    check('description').notEmpty().withMessage('La descripción es obligatoria'),
    check('category').notEmpty().withMessage('La categoría es obligatoria'),
    check('image').custom((value, { req }) => {
        
        if (req.file !== undefined) {
            const fileExtension = path.extname(req.file.originalname); 
            if (fileExtension !== '.png' && fileExtension !== '.jpg' && fileExtension !== '.jpeg') {
                throw new Error('La imagen debe ser .png, .jpg o .jpeg');
            }
            return true;
        }else{
            return true;
        }
    })
];


module.exports = {validateProduct, fileOld};
