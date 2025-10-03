const mongoose  = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/textapp1");

const userSchemea = new mongoose.Schema({
    image: String,
    name: String,
    email: String
}); 

module.exports = mongoose.model('user', userSchemea);