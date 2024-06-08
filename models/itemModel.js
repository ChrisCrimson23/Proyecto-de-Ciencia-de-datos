
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    taskText: String,
    done: Boolean
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

module.exports = Item;