const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

var port = process.env.PORT || 80;


var categorizedProducts;
fs.readFile('data/categorizedProducts.json', function (err, data) {
	categorizedProducts = JSON.parse(data);
});

app.get('/', function (req, res) {
	res.redirect("/products");
});

app.get('/products', function (req, res) {
	res.render('pages/products', {
		categorizedProducts: categorizedProducts,
		currentCategoryId: categorizedProducts.categories[0].id,
		currentPage: "products"
	});
});

app.get('/products/:categoryId?', function (req, res) {
	res.render('pages/products', {
		categorizedProducts: categorizedProducts,
		currentCategoryId: req.params.categoryId,
		currentPage: "products"
	});
});

var shoppingCartContent = [];

app.get('/shoppingCart', function (req, res) {
	console.log('ShoppingCart: GET');
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(shoppingCartContent));
});

app.post('/shoppingCart', function (req, res) {
	console.log('ShoppingCart: POST');
	shoppingCartContent.push({ name: req.body.name, price: req.body.price });
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(shoppingCartContent));
});

app.delete('/shoppingCart', function (req, res) {
	console.log('ShoppingCart: DELETE');
	shoppingCartContent = [];
	res.end(JSON.stringify(shoppingCartContent));
});

app.listen(port);
console.log('Server is listening on port ' + port);


