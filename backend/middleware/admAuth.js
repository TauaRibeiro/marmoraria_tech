const jwt = require('jsonwebtoken')
const Funcionario = require('../models/Funcionario')

const SECRET = process.env.SECRET

function autenticarAdm(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, async (err, usuario) => {
        if(err) return res.sendStatus(403);

        const funcionario = await Funcionario.findById(usuario.id)

        if(!funcionario || !funcionario.eADM){
            return res.sendStatus(403)
        }

        //req.usuario = usuario;

        next();
    })

}

module.exports = autenticarAdm