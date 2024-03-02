// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer =  require('multer');
const path = require('path');


// ************ Controller Require ************
const {controller} = require('../controllers/productsController');
const {validateProduct} = require('../middlewares/validatorProducts');

/* APLICACION DEL MULTER PARA SUBIR IMAGENES */
const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products');
    },
    filename: (req, file, cb) => {
        const fileNewName = "ML-" + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName);
    }
});

const upload = multer({ storage: productStorage });

/*** GET ALL PRODUCTS ***/ 
router.get('/', controller.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', controller.create); 
router.post('/create/' , upload.single('image'), validateProduct ,controller.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', controller.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', controller.edit); 
router.put('/:id',upload.single('image'), controller.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', controller.destroy); 


module.exports = router;
