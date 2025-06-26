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
        type: Number,
        required: true,
         min: 1,
    },
    pesoTipo: {
        type: String,
        enum: ["KG", "LT", "Gr", "Uni"],
        required: true,
    },
    descricao: {
        type: String,
        required: false,
    },
    categoria: {
        type: String,
        enum: ["alimentar", "bebidas", "não comestivel"],
        required: true
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