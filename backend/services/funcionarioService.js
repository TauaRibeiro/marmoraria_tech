const Funcionario = require('../models/Funcionario')
const validarData = require('../utils/validarData')
const validarEmail = require('../utils/validarEmail')

exports.createFuncionario = async (data) => {
    try {
        let {cpf, dataNascimento, telefone, email, senha} = data
    
        if(!cpf || !dataNascimento || !telefone || !email || !senha){
            return {status: 400, message: "Os dados (cpf, dataNascimento, telefone, email, senha) são obrigatórios"}
        }
        
        cpf = (cpf.trim().length != 11) ? null : cpf.trim()
        dataNascimento = validarData(dataNascimento.trim())
        telefone = (telefone.trim().length == 11) ? telefone.trim() : null
        email = (validarEmail(email.trim())) ? email.trim() : null
        senha = (senha.trim().length >= 4) ? senha.trim() : null
        
        if(!cpf){
            return {status: 400, message: "CPF inválido"}
        }

        if(!dataNascimento){
            return {status: 400, message: "Data de nascimento inválida"}
        }

        if(telefone){
            for (let i = 0; i < telefone.length; i++) {
                if(isNaN(parseInt(telefone[i]))){
                    return {status: 400, message: "Telefone inválido"}
                }
                
            }
        }else{
            return {status: 400, message: "Telefone inválido"}
        }

        if(!email){
            return {status: 400, message: "Email inválido"}
        }

        if(!senha){
            return {status: 400, message: "Senha inválida"}
        }
        
        const result = await Funcionario.create({cpf, senha, dataNascimento, telefone, email, senha})

        return {status: 201, result}
    } catch (error) {
        console.log("Erro ao criar Funcionario: \b")
        if(error.name === 'ValidationError'){
            let duplicata = await Funcionario.findOne({cpf})

            if(duplicata){
                console.error(`CPF ${cpf} já existente`)
                return {status:400, message: "CPF inválido"}
            }

            duplicata = await Funcionario.findOne({telefone})

            if(duplicata){
                console.error(`Telefone ${telefone} já existente`)
                return {status: 400, message: "Telefone inválido"}
            }

            duplicata = await Funcionario.findOne({email})

            if(duplicata){
                console.error(`email ${email} já existente`)
                return {status: 400, message: "email inválido"}
            }
        }

        console.error(error)
        return {status: 500, message: "Erro ao criar funcionario"}
    }
}

exports.getFuncionario = async () => {
    try {
        const result = await Funcionario.find()

        return {status: 200, result}
    } catch (error) {
        console.error(`Erro ao fazer o get de funcionario: `, error)
        return {status: 500, message: "Erro ao efetuar o get de Funcionario"}
    }
}

exports.getFuncionarioById = async (id) => {
    try {
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }
    
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }
    
        const result = Funcionario.findById(id)
    
        if(!result){
            return {status: 404, message: "Funcionario não encontrado"}
        }
    
        return {status: 200, result}   
    } catch (error) {
        console.error(`Erro ao fazer o get de Funcionario de id ${id}: `, error)
        return {status: 500, message: "Erro fazer o get de funcionario"}
    }
}
