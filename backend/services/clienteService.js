const Cliente = require('../models/Cliente')
const DataError = require('../models/DataError')

exports.getCliente = async () => {
    try{
        const result = await Cliente.findAll()

        return result.map((cliente) => {
            return {
                id: cliente.id,
                idEndereco: cliente.idEndereco,
                nome: cliente.nome,
                email: cliente.email,
                dataNascimento: cliente.dataNascimento,
                telefone: cliente.telefone,
                cpf: cliente.cpf,
                cnpj: cliente.cnpj,
                createdAt: cliente.createdAt,
                updatedAt: cliente.updatedAt
            }
        })
    }catch(error){
        throw error
    }
}

exports.getClienteByID = async (id) => {
    try{
        const cliente = await Cliente.findById(id)

        if(!cliente){
            throw new DataError('Not Found', 404, 'Cliente não encontrado')
        }

        return {
            id: cliente.id,
            idEndereco: cliente.idEndereco,
            nome: cliente.nome,
            email: cliente.email,
            dataNascimento: cliente.dataNascimento,
            telefone: cliente.telefone,
            cpf: cliente.cpf,
            cnpj: cliente.cnpj,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt
        }
    }catch(error){
        throw error
    }
}

exports.createCliente = async (data) => {
    try {
        const {idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj} = data

        const novoCliente = new Cliente(idEndereco, nome, email, dataNascimento, telefone,
            cpf, cnpj)

        novoCliente.create()
    } catch (error) {
        throw error
    }
    
}

exports.deleteCliente = async (id) => {
    try {
        const antigoCliente = await Cliente.findById(id)

        if(!antigoCliente){
            throw new DataError('Not Found', 404, 'Cliente não encontrado')
        }

        await antigoCliente.delete()
    } catch (error) {
        throw error
    }
        
}

exports.updateCliente = async (data) => {
    try {
        const {id, idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj} = data

        const cliente = await Cliente.findById(id)

        if(!cliente){
            throw new DataError('Not Found', 404, 'Cliente não encontrado')
        }

        cliente.idEndereco = idEndereco
        cliente.nome = nome
        cliente.email = email
        cliente.dataNascimento = dataNascimento
        cliente.telefone = telefone
        cliente.cpf = cpf
        cliente.cnpj = cnpj

        cliente.update()
    } catch (error) {
        throw error
    }
}
