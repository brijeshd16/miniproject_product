let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('./category');
var Subcategory = require('./subcategory');

let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is not optional']
    },
    price: {
        type: String,
        required: [true, 'Price is not optional']
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

let Product = module.exports = mongoose.model('Product', productSchema);