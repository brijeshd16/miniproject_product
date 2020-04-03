var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subcategory = require('./subcategory');

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is not optional']
    },
    category: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }]
});

let Category = module.exports = mongoose.model('Category', categorySchema);