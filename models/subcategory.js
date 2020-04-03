var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is not optional']
    }
});

let Subcategory = module.exports = mongoose.model('Subcategory', subcategorySchema);