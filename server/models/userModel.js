const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    logName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: [6, "A password deve ter pelo menos 6 caracteres."], 
        maxLength:[8, "A password deve ter no maximo 8 caracteres."],
        required: true,
    }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10); 
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model("user", userSchema);
module.exports = User;
