const Funcionario = require('../models/Funcionario')
const validarData = require('../utils/validarData')
const validarEmail = require('../utils/validarEmail')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')
const validarTelefone = require('../utils/validarTelefone')

exports.createFuncionario = async (data) => {
    try {
        var {cpf, nome, dataNascimento, telefone, email, senha} = data
    
        if(!cpf || !dataNascimento || !telefone || !email || !senha){
            return {status: 400, message: "Os dados (cpf, dataNascimento, telefone, email, senha) são obrigatórios"}
        }
        
        dataNascimento = validarData(dataNascimento.trim())

        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }

        if(!eNumerico(cpf) || cpf.trim().length != 11){
            return {status: 400, message: "CPF inválido"}
        }

        if(!dataNascimento){
            return {status: 400, message: "Data de nascimento inválida"}
        }

        if(!validarTelefone(telefone)){
            return {status: 400, message: "Telefone inválido"}
        }

        if(!validarEmail(email.trim())){
            return {status: 400, message: "Email inválido"}
        }

        if(senha.trim().length < 4){
            return {status: 400, message: "Senha inválida"}
        }
        
        const result = await Funcionario.create({
            cpf: cpf.trim(), 
            nome: nome.trim(), 
            senha: senha.trim(), 
            dataNascimento, 
            telefone: telefone.trim(), 
            email: email.trim(), 
            senha: senha.trim()
        })

        return {status: 201, result}
    } catch (error) {
        console.log("Erro ao criar Funcionario: \b")
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
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
    
        const result = await Funcionario.findById(id.trim())
    
        if(!result){
            return {status: 404, message: "Funcionario não encontrado"}
        }
    
        return {status: 200, result}   
    } catch (error) {
        console.error(`Erro ao fazer o get de Funcionario de id ${id}: `, error)
        return {status: 500, message: "Erro fazer o get de funcionario"}
    }
}

exports.updateFuncionario = async (data) => {
    try {
        if(!data.id){
            return {status: 400, message: "Id é obrigatório"}
        }
    
        if(!validarId(data.id)){
            return {status: 400, message: "Id inválido"}
        }

        var {id, nome, cpf, dataNascimento, telefone, email, senha} = data

        if(!nome || !cpf || !dataNascimento || !telefone || !email || !senha){
            return {status: 400, message: "Pelo menos um dos capos de Funcionario é necessário para atualizar"}
        }

        dataNascimento = validarData(dataNascimento)

        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }

        if(!eNumerico(cpf) || cpf.trim().length != 11){
            return {status: 400, message: "CPF inválido"}
        }

        if(!dataNascimento){
            return {status: 400, message: "Data de nascimento inválida"}
        }

        if(!validarTelefone(telefone)){
            return {status: 400, message: "Telefone inválido"}
        }

        if(!validarEmail(email.trim())){
            return {status: 400, message: "Email inválido"}
        }

        if(senha.trim().length < 4){
            return {status: 400, message: "Senha inválida"}
        }


        await Funcionario.findByIdAndUpdate(id, {
            cpf: cpf.trim(),
            nome: nome.trim(),
            dataNascimento,
            telefone: telefone.trim(),
            email: email.trim(),
            senha: senha.trim()
        })

        return {status: 200}
    } catch (error) {
        console.log("Erro ao criar Funcionario: \b")
        if(error.codeName == 'DuplicateKey'){
            let duplicata = await Funcionario.findOne({cpf})

            if(duplicata && duplicata._id != id){
                console.error(`CPF ${cpf} já existente`)
                return {status:400, message: "CPF inválido"}
            }

            duplicata = await Funcionario.findOne({telefone})

            if(duplicata && duplicata._id != id){
                console.error(`Telefone ${telefone} já existente`)
                return {status: 400, message: "Telefone inválido"}
            }

            duplicata = await Funcionario.findOne({email})

            if(duplicata && duplicata._id != id){
                console.error(`email ${email} já existente`)
                return {status: 400, message: "email inválido"}
            }
        }

        console.error(error)
        return {status: 500, message: "Erro ao atualizar funcionario"}
    }
}

exports.deleteFuncionario = async (data) => {
    try {
        const {idUsuario, idFuncionario} = data

        if(!idUsuario){
            return {status: 400, message: "Id do usuário é obrigatório"}
        }
    
        if(validarId(idUsuario)){
            return {status: 400, message: "Id do usuário inválido"}
        }
    
        if(!idFuncionario){
            return {status: 400, message: "Id do funcionário é obrigatório"}
        }
    
        if(!validarId(idFuncionario)){
            return {status: 400, message: "Id do funcionário inválido"}
        }

        if(idFuncionario === idUsuario){
            return {status: 403, message: "Não é possível remover usuário do sistema estando logado como ele"}
        }

        const antigoFuncionario = await Funcionario.findByIdAndDelete(idFuncionario)

        if(!antigoFuncionario){
            return {status: 404, message: "Funcionario não encontrado"}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao deletar funcionario de id ${id}: `, error)
        return {status: 500, message: "Erro ao deletar funcionario"}
    }
}
