const Status = require('../models/Status')
const Material = require('../models/Material')
const Orcamento = require('../models/Orcamento')
const DataError = require('../models/DataError')

exports.criarStatus = async (nome) => {
    try{
        const novoStatus = new Status(nome)
        await novoStatus.create()
    }catch(error){
        throw error
    }
}

exports.getAllStatus = async () => {
    try{
        const resultado = await Status.findAll()
        
        return resultado.map((status) => {
            return {
                id: status.id,
                nome: status.nome,
                createdAt: status.createdAt,
                updatedAt: status.updatedAt
            }
        })
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
        
        return {id: resultado.id, nome: resultado.nome, createdAt: resultado.createdAt, updatedAt: resultado.updatedAt}
    }catch(error){
        throw error
    }
}

exports.updateStatus = async (id, novoNome) => {
    try{
        const statusAntigo = await Status.findById(id)
        
        if(!statusAntigo){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        if(process.env[statusAntigo.nome.toUpperCase().replace(' ', '_')]){
            throw new DataError('Validation error', 400, 'Não é possível atualizar um status padrão')
        }

        statusAntigo.nome = novoNome
    
        await statusAntigo.update()
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

        status.delete()
    }catch(error){
        throw error
    }
}