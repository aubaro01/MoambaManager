const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
    const { nome, logName, password } = req.body;

    try {
        const existingUser = await User.findOne({ logName });
        if (existingUser) {
            return res.status(400).json({ message: "Nome de login já está em uso." });
        }

        const newUser = new User({ nome, logName, password });
        await newUser.save();

        res.status(201).json({ message: "Utilizador registrado com sucesso!" });
    } catch (err) {
        console.error('Erro ao registrar utilizador:', err);
        res.status(500).json({ error: "Erro ao registrar utilizador.", details: err.message });
    }
};

const login = async (req, res) => {
    const { logName, password } = req.body;

    try {
        console.log('Login request recebido:', req.body);

        const user = await User.findOne({ logName });
        if (!user) {
            return res.status(401).json({ message: "Utilizador não encontrado." });
        }

        console.log(' Utilizador encontrado:', user);

        if (typeof user.comparePassword !== 'function') {
            console.error(' comparePassword não está definido no modelo User.');
            return res.status(500).json({ error: "Erro interno no servidor: comparePassword não implementado." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password incorreta." });
        }

        const token = jwt.sign(
            { id: user._id, logName: user.logName },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        console.log(' Token JWT gerado com sucesso.');

        res.status(200).json({
            message: "Sucesso! Login feito!",
            token,
            user: {
                nome: user.nome,
                logName: user.logName
            }
        });
    } catch (err) {
        console.error('Erro durante o login:', err);
        res.status(500).json({ error: "Erro no login.", details: err.message });
    }
};
module.exports = {
    register,
    login,
};
