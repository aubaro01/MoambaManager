const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mes: {
        type: String,
        required: true,
    },
    valor: {
        type: String,
        required: true
    }

});

const User = mongoose.model("objetivos", userSchema);
module.exports = User;
