const mongoose = require("mongoose");
const productSchema = require("./productsModel"); 

const sellsSchema = new mongoose.Schema({ 
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
    }, 
    products: [productSchema]
});

const Sells = mongoose.model("vendas", sellsSchema);
module.exports = Sells;
