const Cliente = require('../models/Cliente')
const Orcamento = require('../models/Orcamento')
const Endereco = require('../models/Endereco')
const DataError = require('../models/DataError')

exports.getCliente = async () => {
    try{
        const result = await Cliente.findAll()

        return Promise.all(result.map(async (cliente) => {
            const endereco = await Endereco.findById(cliente.idEndereco)

            return {
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                dataNascimento: cliente.dataNascimento,
                telefone: cliente.telefone,
                cpf: cliente.cpf,
                cnpj: cliente.cnpj,
                endereco: JSON.parse(JSON.stringify(endereco))
            }
        }))
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

        const endereco = await Endereco.findById(cliente.idEndereco)

        return {
                id: cliente.id,
                nome: cliente.email,
                dataNascimento: cliente.dataNascimento,
                telefone: cliente.telefone,
                cpf: cliente.cpf,
                cnpj: cliente.cnpj,
                endereco: JSON.parse(JSON.stringify(endereco))
            }
    }catch(error){
        throw error
    }
}

exports.createCliente = async (data) => {
    try {
        const {idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj} = data

        const endereco = await Endereco.findById(idEndereco)

        if(!endereco){
            throw new DataError('Not Found', 404, 'Endereço não encontrado')
        }

        const novoCliente = new Cliente(idEndereco, nome, email, dataNascimento, telefone,
            cpf, cnpj)

        await novoCliente.create()

        return {
            id: novoCliente.id,
            nome: novoCliente.email,
            dataNascimento: novoCliente.dataNascimento,
            telefone: novoCliente.telefone,
            cpf: novoCliente.cpf,
            cnpj: novoCliente.cnpj,
            endereco: JSON.parse(JSON.stringify(endereco))
        }
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

        const orcamento = await Orcamento.findManyBy({idCliente: id})

        if(orcamento.length !== 0){
            throw new DataError('Dependecy Error', 400, 'Existe pelo menos 1 orçamento que tem dados cliente')
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

        const endereco = await Endereco.findById(idEndereco)

        if(!endereco){
            throw new DataError('Not Found', 404, 'Endereço não encontrado')
        }

        cliente.idEndereco = idEndereco
        cliente.nome = nome
        cliente.email = email
        cliente.dataNascimento = dataNascimento
        cliente.telefone = telefone
        cliente.cpf = cpf
        cliente.cnpj = cnpj

        await cliente.update()

        return {
            id: cliente.id,
            nome: cliente.email,
            dataNascimento: cliente.dataNascimento,
            telefone: cliente.telefone,
            cpf: cliente.cpf,
            cnpj: cliente.cnpj,
            endereco: JSON.parse(JSON.stringify(endereco))
        }
    } catch (error) {
        throw error
    }
}
