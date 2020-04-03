const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//Creating DB connection
mongoose.connect('mongodb://localhost/prod_cat');
let db = mongoose.connection;

//Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

//Check dB error
db.on('error', function (err) {
    console.log(err);
});

//Initializing app
const app = express();

//Getting models
let Product = require('./models/products');
let Category = require('./models/category');
let Subcategory = require('./models/subcategory');


//Engine load
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Route home
app.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Hello',
                products: products
            });
        }
        console.log(products)
    });
});

//Get Single Article
app.get('/product/:id', function (req, res) {
    Product.findById(req.params.id).populate({
        path: 'category',
        model: 'Category',
        populate: {
            path: 'category',
            model: 'Subcategory'
        }
    }).exec(function (err, product) {
        res.render('product', {
            product: product
        });
        console.log(product)
    });

});

//Route add
app.get('/products/add', function (req, res) {
    res.render('add_product', {
        title: "Add Product"
    });
});

//Rounte on Add sumbit button POST
app.post('/products/add', function (req, res) {
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.catergory = req.body.catergory;
    // console.log('Submitted !');
    // return;

    product.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/')
        }
    });
});

//Rounte on Edit sumbit button POST
app.post('/products/edit/:id', function (req, res) {
    let product = {};
    product.name = req.body.name;
    product.price = req.body.price;
    product.catergory = req.body.catergory;

    let query = { _id: req.params.id };

    Product.update(query, product, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/')
        }
    });
});

//Load Edit Form
app.get('/products/edit/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        res.render('edit_product', {
            title: "Edit Product",
            product: product
        });
    });
});

//Start server
app.listen(3000, function () {
    console.log('Server started on port 3000....');
});


