const TipoMaterial = require('../models/TipoMaterial')
const Material = require('../models/Material')
const DataError = require('../models/DataError')

exports.criarTipoMaterial = async (nome) => {
    try{
        const novoTipo = new TipoMaterial(nome)

        await novoTipo.create()
    }catch(error){
        throw error
    }
}

exports.getTipoMaterial = async () => {
    try{
        const result = await TipoMaterial.findAll();

        return result.map((tipo) => {
            return {
                id: tipo.id,
                nome: tipo.nome,
                createdAt: tipo.createdAt,
                updatedAt: tipo.updatedAt
            }
        })
    }catch(error){
        throw error
    }
}

exports.getTipoMaterialByID = async (id) => {
    try{
        const result = await TipoMaterial.findById(id)

        if(!result){
            throw new DataError('Not Found', 404, 'Tipo de material não encotrado')
        }

        return {id: result.id, nome: result.nome, createdAt: result.createdAt, updatedAt: result.updatedAt}
    }catch(error){
        throw error
    }
}

exports.updateTipoMaterial = async (id, novoNome) => {
    try {
        const tipo = await TipoMaterial.findById(id)

        if(!tipo){
            throw new DataError('Not Found', 404, 'Tipo não encotrado')
        }

        tipo.nome = novoNome

        await tipo.update()
    } catch (error) {
        throw error
    }
}

exports.deleteTipoMaterial = async (id) => {
    try {
        const tipo = await TipoMaterial.findById(id)
        
        if(!tipo){
            throw new DataError('Not Found', 404, 'Tipo não encontrado')
        }

        const materiais = await Material.findManyBy({idTipo: tipo.id})

        if(materiais.length !== 0){
            throw new DataError('Dependecy Error', 400, 'Existe pelo menos um material que utiliza este tipo')
        }

        await tipo.delete()
    }catch(error){
        throw error
    }
}