const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    preco: {
        type: Number,
        required: true
    },
    peso: {
        type: String,
        required: true,
    },
    pesoTipo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: false,
    },
    categoria: {
        type: String
    },
    criadoEm: {
        type: Date,
        default: Date.now,
    },
    EditadoEm: {
        type: Date,
        default: Date.now,
    }
});

const product = mongoose.model("produtos", productSchema);
module.exports = product;