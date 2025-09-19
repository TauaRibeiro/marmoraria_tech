const DataError = require('../models/DataError')
const Endereco = require('../models/Endereco')

exports.criarEndereco = async (enderecoData) => {
    try{
        const {cep, cidade, rua, numero, bairro, complemento} = enderecoData

        const novoEndereco = new Endereco(cep, cidade, rua, numero, bairro, complemento)

        await novoEndereco.create()

        return JSON.parse(JSON.stringify(novoEndereco))
    }catch(error){
        throw error
    }
}

exports.getEndereco = async () => {
    try{
        const result = await Endereco.findAll()

        return result.map((endereco) => {
            return JSON.parse(JSON.stringify(endereco))
            
        })
    }catch(error){
        throw error
    }
}

exports.getEnderecoByID = async (id) => {
    try {
        const endereco = await Endereco.findById(id)

        if(!endereco){
            throw new DataError('Not Found', 404, 'Endereço não encontrado')
        }

        return JSON.parse(JSON.stringify(endereco))
    } catch (error) {
        throw error
    }
}

exports.updateEndereco = async (id, data) => {
    try {
        const endereco = await Endereco.findById(id)

        if(!endereco){
            throw new DataError('Not Found', 404, 'Endereço não encontrado')
        }

        const {cep, cidade, rua, numero, bairro, complemento} = enderecoData

        endereco.cep = cep
        endereco.cidade = cidade
        endereco.rua = rua
        endereco.numero = numero
        endereco.bairro = bairro
        endereco.complemento = complemento

        await endereco.update()

        return JSON.parse(JSON.stringify(endereco))
    } catch (error) {
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
            return {status: 400, message: "Já existe um endereço com este CEP"}
        }
        
        console.error("Erro ao atualizar o endereço:")
        console.error(error)

        return {status: 500, message: 'Erro ao atualizar o endereço'}
    }

}

exports.deleteEndereco = async (id) => {
    try {
        const endereco = await Endereco.findById(id)

        if(!endereco){
            throw new DataError('Not Found', 404, 'Endereço não encontrado')
        }

        await endereco.delete()
    } catch (error) {
        throw error
    }
}