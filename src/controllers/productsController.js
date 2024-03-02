const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require('express-validator');
const { error, log } = require('console');
let { fileOld } = require('../middlewares/validatorProducts');


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productId = req.params.id;
        const product = products.find(product => product.id === parseInt(productId));
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('detail', { product, pageTitle: product.name });
	},

	// Create - Form to create
	create: (req, res) => {
		let errors =null ;
		res.render('product-create-form', {errors , old: {}});
	},
	
	// Create -  Method to store
	
	store: (req, res) => {
		const { name, price, discount, category, description ,image} = req.body;

		//const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);

		const newProduct = {
			id : products.at(-1).id + 1,
			//id: maxId + 1,
			name,
			price,
			discount,
			category,
			description,
			image: req.file?.filename || fileOld.image
		};
	
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			let oldData = { ...req.body };
			if (req.file) {				
				oldData.image = req.file.filename;
				fileOld = oldData;
			}else{
				oldData = fileOld;
				oldData.image = fileOld.image;
				newProduct.image = oldData.image;
			}
			return res.render('product-create-form', { errors: errors.mapped(), old: oldData });
		}else{
			products.push(newProduct);
		
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		
			return res.redirect('/products');
		}

	},

	// Update - Form to edit
	edit: (req, res) => {
		const productId = req.params.id;
		const productToEdit = products.find(product => product.id === parseInt(productId));
		res.render('product-edit-form', {productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		const productId = req.params.id;
		const productToUpdateIndex = products.findIndex(product => product.id === parseInt(productId));
		if (productToUpdateIndex === -1) {
			return res.status(404).send('Product not found');
		}
	
		const updatedProductData = req.body;

		const productToUpdate = products[productToUpdateIndex];
		
		if (req.file) {
			if (productToUpdate.image) {
				const imagePath = path.join(__dirname, '../../public/images/products', productToUpdate.image);
				fs.unlinkSync(imagePath);
			}
			updatedProductData.image = req.file.filename;
		}
		products[productToUpdateIndex] = { ...products[productToUpdateIndex], ...updatedProductData };
	
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
	
		return res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productId = req.params.id;
		const productIndex = products.findIndex(product => product.id === parseInt(productId));
		if (productIndex === -1) {
			return res.status(404).send('Product not found');
		}

		 // Eliminar la imagen asociada al producto, si existe
		const productToDelete = products[productIndex];
		if (productToDelete.image) {
			const imagePath = path.join(__dirname, '../../public/images/products', productToDelete.image);
			fs.unlinkSync(imagePath);
		}

		products.splice(productIndex, 1);
	
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
	
		return res.redirect('/products');
	}
};

module.exports = {controller};