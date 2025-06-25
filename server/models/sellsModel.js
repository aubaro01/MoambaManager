const mongoose = require("mongoose");

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
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "produtos",
                required: true
            },
            NomeProduct: {
                type: String,
                required: true
            },
            quantidade: {
                type: Number,
                required: true,
                min: 1
            },
            precoUnitario: {
                type: Number,
                required: true
            }
        }
    ]
});

const Sells = mongoose.model("vendas", sellsSchema);
module.exports = Sells;
