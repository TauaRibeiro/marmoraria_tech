const Funcionario = require('../models/Funcionario')


exports.createFuncionario = async (data) => {
    try {
        const {cpf, nome, dataNascimento, telefone, email, senha} = data
        const novoFuncionario = new Funcionario(nome, cpf, dataNascimento, telefone, email, senha)

        await novoFuncionario.create()

        return JSON.parse(JSON.stringify(novoFuncionario))
    } catch (error) {
        throw error
    }
}

exports.getFuncionario = async () => {
    try {
        const result = await Funcionario.findAll()

        return result.map(funcionario => JSON.parse(JSON.stringify(funcionario)))
    } catch (error) {
        throw error
    }
}

exports.getFuncionarioById = async (id) => {
    try {
        const result = await Funcionario.findById(id)

        if(!result){
            throw new DataError('Not Found', 404, 'Funcionario não encontrado')
        }

        return JSON.parse(JSON.stringify(result))
    } catch (error) {
        throw error
    }
}

exports.updateFuncionario = async (data) => {
    try {
        const {id, cpf, nome, dataNascimento, telefone, email, senha} = data
        const funcionario = await Funcionario.findById(id)

        if(!funcionario){
            throw new DataError('Not Found', 404, 'Funcionario não encontrado')
        }

        funcionario.cpf = cpf
        funcionario.nome = nome
        funcionario.dataNascimento = dataNascimento
        funcionario.telefone = telefone
        funcionario.email = email
        funcionario.senha = senha

        await funcionario.update()

        return JSON.parse(JSON.stringify(funcionario))
    } catch (error) {
        throw error
    }
}

exports.deleteFuncionario = async (id) => {
    try {
        const funcionario = await Funcionario.findById(id)

        if(!funcionario){
            throw new DataError('Not Found', 404, 'Funcionario não encontrado')
        }

        await funcionario.delete()
    } catch (error) {
        throw error
    }
}
