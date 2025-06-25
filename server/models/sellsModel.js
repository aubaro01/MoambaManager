const mongoose = require("mongoose");
const productSchema = require("./productsModel"); 

const sellsSchema = new mongoose.Schema({
    products: [productSchema], 
    vendidoEm: {
        type: Date,
        default: Date.now,
    },
    precoTotal: {
        type: Number,
        required: true,
    },
    clientDados: { 
        type: String,
        required: false,
    }
});

const Sells = mongoose.model("vendas", sellsSchema);
module.exports = Sells;
