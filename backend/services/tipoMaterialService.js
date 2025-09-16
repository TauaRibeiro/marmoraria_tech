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

        return result
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

        return result
    }catch(error){
        throw error
    }
}

exports.updateTipoMaterial = async (id, novoNome) => {
    try {
        const tipo = await TipoMaterial.findById(id)

        tipo.nome = novoNome

        await tipo.update()
    } catch (error) {
        throw error
    }
}

exports.deleteTipoMaterial = async (id) => {
    try {
        const tipo = await TipoMaterial.findById(id)
    }catch(error){
        throw error
    }
}