const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visited = products.filter(product => product.category === 'visited');
		const inSale = products.filter(product => product.category === 'in-sale');

		res.render('index', { visited, inSale, toThousand });
	},
	search: (req, res) => {
		const query = req.query.q; 
		const results = products.filter(product => {
				const productName = product.name.toLowerCase();
				const queryLowerCase = query.toLowerCase();
				return productName.includes(queryLowerCase);
		});
		console.log(results);
		console.log(query);
		res.render('results', { results, query });
	},
	admin: (req, res) => {
		const user = req.query.user;
    	res.send(`Hola Admin: ${user}`);
		//res.render('products', {products});
	}

};

module.exports = controller;
