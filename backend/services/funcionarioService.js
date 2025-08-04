const Funcionario = require('../models/Funcionario')
const validarData = require('../utils/validarData')
const validarEmail = require('../utils/validarEmail')

exports.createFuncionario = async (data) => {
    try {
        var {cpf, nome, dataNascimento, telefone, email, senha} = data
    
        if(!cpf || !dataNascimento || !telefone || !email || !senha){
            return {status: 400, message: "Os dados (cpf, dataNascimento, telefone, email, senha) são obrigatórios"}
        }
        
        cpf = (cpf.trim().length != 11) ? null : cpf.trim()
        dataNascimento = validarData(dataNascimento.trim())
        telefone = (telefone.trim().length == 11) ? telefone.trim() : null
        email = (validarEmail(email.trim())) ? email.trim() : null
        senha = (senha.trim().length >= 4) ? senha.trim() : null
        nome = (nome.trim().length > 2) ? nome.trim() : null

        if(!nome){
            return {status: 400, message: "Nome inválido"}
        }

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
        
        const result = await Funcionario.create({cpf, nome, senha, dataNascimento, telefone, email, senha})

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
    
        const result = await Funcionario.findById(id)
    
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
    
        if(data.id.trim().length === 0 || data.id.length < 24 || data.id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        var {id, nome, cpf, dataNascimento, telefone, email, senha} = data

        if(!nome && !cpf && !dataNascimento && !telefone && !email && !senha){
            return {status: 400, message: "Pelo menos um dos capos de Funcionario é necessário para atualizar"}
        }

        id = id.trim()

        const antigoFuncionario = await Funcionario.findById(id)

        if(!antigoFuncionario){
            return {status: 404, message: "Funcionario não encontrado"}
        }

        cpf = (cpf !== null && cpf !== undefined) ? cpf.trim() : null
        dataNascimento = (dataNascimento !== null && dataNascimento !== undefined) ? validarData(dataNascimento.trim()) : null
        telefone = (telefone !== null && telefone !== undefined) ? telefone.trim() : null
        email = (email !== null && email !== undefined) ? email.trim() : null
        senha = (senha !== null && senha !== undefined) ? senha.trim() : null
        nome = (nome !== null && nome !== undefined) ? nome.trim() : null

        if(nome && nome.length < 2){
            return {status: 400, message: "Nome inválido"}
        }

        if(cpf && cpf.length != 11){
            return {status: 400, message: "CPF inválido"}
        }

        if(!dataNascimento && dataNascimento != null){
            return {status: 400, message: "Data de nascimento inválida"}
        }

        if(telefone && telefone.length == 11){
            for (let i = 0; i < telefone.length; i++) {
                if(isNaN(parseInt(telefone[i]))){
                    return {status: 400, message: "Telefone inválido"}
                }
                
            }
        }else if(telefone){
            return {status: 400, message: "Telefone inválido"}
        }

        if(email && !validarEmail(email)){
            return {status: 400, message: "Email inválido"}
        }

        if(senha && senha.length < 4){
            return {status: 400, message: "Senha inválida"}
        }


        await Funcionario.findByIdAndUpdate(id, {
            cpf: cpf ?? antigoFuncionario.cpf,
            nome: nome ?? antigoFuncionario.nome,
            dataNascimento: dataNascimento ?? antigoFuncionario.dataNascimento,
            telefone: telefone ?? antigoFuncionario.telefone,
            email: email ?? antigoFuncionario.email,
            senha: senha ?? antigoFuncionario.senha
        })

        return {status: 200}
    } catch (error) {
        console.log("Erro ao criar Funcionario: \b")
        if(error.codeName == 'DuplicateKey'){
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
        return {status: 500, message: "Erro ao atualizar funcionario"}
    }
}

exports.deleteFuncionario = async (id) => {
    try {
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }
    
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        const antigoFuncionario = await Funcionario.findByIdAndDelete(id)

        if(!antigoFuncionario){
            return {status: 404, message: "Funcionario não encontrado"}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao deletar funcionario de id ${id}: `, error)
        return {status: 500, message: "Erro ao deletar funcionario"}
    }
}
