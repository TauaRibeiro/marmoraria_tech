const Ambiente = require('../models/Ambiente')
const DataError = require('../models/DataError')
const ItemOrcamento = require('../models/ItemOrcamento')

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

        return JSON.parse(JSON.stringify(ambiente))
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
        
        if((await ItemOrcamento.findManyBy({idAmbiente: ambiente.id})).length > 0){
            throw new DataError('Dependecy Error', 400, 'O ambiente é utilizado em pelo menos um orçamento')
        }
        
        await ambiente.delete()
    }catch(error){
        throw error
    }
}