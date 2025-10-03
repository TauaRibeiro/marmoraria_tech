const jwt = require('jsonwebtoken')
const Funcionario = require('../models/Funcionario')

const SECRET = process.env.SECRET

async function autenticarAdm(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        const usuario = jwt.verify(token, SECRET);
        const funcionario = await Funcionario.findById(usuario.id);

        if (!funcionario) {
            return res.status(403).json({ error: "Usuário não encontrado" });
        }

        if(!funcionario.eADM){
            return res.sendStatus(403)
        }

        req.usuario = funcionario;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
    }
}

module.exports = autenticarAdm