const jwt = require('jsonwebtoken')
const Funcionario = require('../models/schemas/Funcionario')
const SECRET = process.env.SECRET
const validarEmail = require('../utils/validarEmail')

exports.login = async (data) => {
    try{
        const {email, senha} = data
    
        if(!email || !senha){
            return {status: 400, message: "Email e senha são obrigatórios para o login"}
        }
    
        if(!validarEmail(email)){
            return {status: 400, message: "Email inválido"}
        }
    
        if(senha.length <= 2){
            return {status: 400, message: "Senha inválida"}
        }
    
        const usuario = await Funcionario.findOne({email, senha})
    
        if(!usuario){
            return {status: 404, message: "Usuario não encontrado"}
        }

        const token = jwt.sign({id: usuario._id, login: usuario.email}, SECRET, { expiresIn: "12h"})

        return {status: 200, result: token}
    }catch(error){
        console.error("Erro ao fazer login do usuario: ", error)
    }
}