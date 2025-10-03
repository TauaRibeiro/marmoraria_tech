const authService = require('../services/authService')
const validarEmail = require('../utils/validarEmail')

exports.login = async (req, res) => {
    try{
        let {email, senha} = req.body

        if(!email || !senha){
            return res.status(400).json({name: "Parameter Error", message: "email e senha são obrigatórios para o login"})
        }

        email = email.trim()
        senha = senha.trim()

        if(!validarEmail(email)){
            return res.status(400).json({name: "Validation Error", message: "Email inválido"})
        }

        if(senha.length < 4){
            return res.status(400).json({name: "Validation Error", message: "Senha inválida"})
        }

        const token = await authService.login({email, senha})
    
        return res.status(200).json({token})
    
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}