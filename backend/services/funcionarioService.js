const DataError = require('../models/DataError')
const Funcionario = require('../models/Funcionario')


exports.createFuncionario = async (data) => {
    try {
        const {cpf, nome, dataNascimento, telefone, email, senha, eADM} = data
        const novoFuncionario = new Funcionario(nome, cpf, dataNascimento, telefone, email, senha, eADM)

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
        const {id, cpf, nome, dataNascimento, telefone, email, senha, eADM} = data
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
        funcionario.eADM = eADM

        await funcionario.update()

        return JSON.parse(JSON.stringify(funcionario))
    } catch (error) {
        throw error
    }
}

exports.deleteFuncionario = async (data) => {
    try {
        const {idAdm, idDelete} = data

        const adm = await Funcionario.findById(idAdm)

        if(!adm){
            throw new DataError('Not Found', 404, 'ADM não encontrado')
        }

        if(!adm.eADM){
            throw new DataError('Permission Error', 403, 'Funcionario não é ADM para efetuar a ação')
        }

        const funcionario = await Funcionario.findById(idDelete)

        if(!funcionario){
            throw new DataError('Not Found', 404, 'Funcionário não encontrado')
        }

        if(adm.id === funcionario.id){
            throw new DataError('Permission Erro', 403, 'ADM não pode se deletar do sistema')
        }

        await funcionario.delete()
    } catch (error) {
        throw error
    }
}
