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
        immutable: true
    },
    EditadoEm: {
        type: Date,
        default: Date.now,
    }
});

productSchema.pre("save", function (next) {
    if (!this.isNew) {
        this.EditadoEm = Date.now();
    }
    next();
});

productSchema.pre("findOneAndUpdate", function (next) {
    this.set({ EditadoEm: Date.now() });
    next();
});

productSchema.statics.getEnums = function () {
  return {
    pesoTipos: this.schema.path('pesoTipo').enumValues,
    categorias: this.schema.path('categoria').enumValues
  };
};

const product = mongoose.model("produtos", productSchema);
module.exports = product;