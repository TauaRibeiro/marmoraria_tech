const jwt = require('jsonwebtoken')
const Funcionario = require('../models/Funcionario')
const SECRET = process.env.SECRET

exports.login = async (data) => {
    try{
        const {email, senha} = data
    
        const usuario = await Funcionario.findBy({email, senha})
        
        if(!usuario){
            throw new DataError('Not Found', 404, "Funcionário não encontrado")
        }

        const token = jwt.sign({id: usuario._id, eADM: usuario.eADM}, SECRET, { expiresIn: "12h"})

        return token
    }catch(error){
        console.error("Erro ao fazer login do usuario: ", error)
    }
}