const Status = require('../models/Status')
const Material = require('../models/Material')
const Orcamento = require('../models/Orcamento')
const DataError = require('../models/DataError')

exports.criarStatus = async (nome, eMutavel) => {
    try{
        const novoStatus = new Status(nome, eMutavel)
        await novoStatus.create()

        return JSON.parse(JSON.stringify(novoStatus))
    }catch(error){
        throw error
    }
}

exports.getAllStatus = async () => {
    try{
        const resultado = await Status.findAll()
        
        return resultado.map((status) => JSON.parse(JSON.stringify(status)))
    }catch(error){
        throw error
    }
}

exports.getStatusByID = async (id) => {
    try{
        const resultado = await Status.findById(id)
        
        if(!resultado){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }
        
        return JSON.parse(JSON.stringify(resultado))
    }catch(error){
        throw error
    }
}

exports.updateStatus = async (id, novoNome, eMutavel) => {
    try{
        const statusAntigo = await Status.findById(id)
        
        if(!statusAntigo){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        if(process.env[statusAntigo.nome.toUpperCase().replace(' ', '_')]){
            throw new DataError('Validation error', 400, 'Não é possível atualizar um status padrão')
        }

        statusAntigo.nome = novoNome
        statusAntigo.eMutavel = eMutavel

        await statusAntigo.update()

        return JSON.parse(JSON.stringify(statusAntigo))
    }catch(error){
        throw error
    }
}

exports.deleteStatus = async (id) => {
    try{
        const status = await Status.findById(id)
        
        if(!status){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        if(process.env[status.nome.toUpperCase().replace(' ', '_')]){
            throw new DataError('Validation error', 400, 'Não é possível deletar um status padrão')
        }

        await Material.updateManyBy({idStatus: status.id}, {idStatus: process.env.STATUS_DELETADO})
        await Orcamento.updateManyBy({idStatus: status.id}, {idStatus: process.env.STATUS_DELETADO})

        await status.delete()
    }catch(error){
        throw error
    }
}