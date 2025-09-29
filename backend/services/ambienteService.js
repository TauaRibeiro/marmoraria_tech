const Ambiente = require('../models/Ambiente')
const DataError = require('../models/DataError')


exports.criarAmbiente = async (nome) => {
    try{
        const novoAmbiente = new Ambiente(nome)

        await novoAmbiente.create()

        return JSON.parse(JSON.stringify(novoAmbiente))
    }catch(error){
        throw error
    }
}

exports.getAmbiente = async () => {
    try{
        const result = await Ambiente.findAll()

        return result.map((ambiente) => {
            return JSON.parse(JSON.stringify(ambiente))
        })
    }catch(error){
        throw error
    }
}

exports.getAmbienteByID = async (id) => {
    try{
        const ambiente = await Ambiente.findById(id)

        if(!ambiente){
            throw new DataError('Not Found', 404, 'Ambiente não encontrado')
        }

        return JSON.parse(JSON.stringify(novoAmbiente))
    }catch(error){
        throw error
    }
}

exports.updateAmbiente = async (id, novoNome) => {
    try {
        const ambiente = await Ambiente.findById(id)

        if(!ambiente){
            throw new DataError('Not Found', 404, 'Ambiente não encontrado')
        }

        ambiente.nome = novoNome

        await ambiente.update()

        return JSON.parse(JSON.stringify(ambiente))
    } catch (error) {
        throw error
    }
}

exports.deleteAmbiente = async (id) => {
    try {
        const ambiente = await Ambiente.findById(id)

        if(!ambiente){
            throw new DataError('Not Found', 404, 'Ambiente não encontrado')
        }

        await ambiente.delete()
    }catch(error){
        throw error
    }
}