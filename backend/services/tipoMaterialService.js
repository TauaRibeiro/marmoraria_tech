const TipoMaterial = require('../models/TipoMaterial')
const materialService = require('../services/materialService')
const validarId = require('../utils/validarIdMongoose')

exports.criarTipoMaterial = async (nome) => {
    try{
        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }
    
        const result = await TipoMaterial.create({nome: nome.trim()})

        return {status: 201, result}
    }catch(error){
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
            return {status: 400, message: "Já existe um tipo de material com esse nome"}
        }
        
        console.error(`Erro ao criar TipoMaterial ${nome}: ${error}`);
        return {status: 500, message: `Erro ao criar status ${nome}`}
    }
}

exports.getTipoMaterial = async () => {
    try{
        const result = await TipoMaterial.find();

        return {status: 200, result}
    }catch(err){
        console.error('Erro ao pegar todos os TipoMaterial')

        return {status: 500, message: "Erro ao pegar todos os TipoMaterial"}
    }
}

exports.getTipoMaterialByID = async (id) => {
    try{
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
        const result = await TipoMaterial.findById(id.trim());

        if(!result){
            return {status: 404, message: "Tipo de material não encontrado"}
        }

        return {status: 200, result}
    }catch(error){
        console.error(`Erro ao buscar TipoMaterial com id ${id}: `, error);

        return {status: 500, message: "Erro ao buscar TipoMaterial"}
    }
}

exports.updateTipoMaterial = async (id, novoNome) => {
    try {
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }

        if(novoNome.trim().length == 0){
            return {status: 400, message: "Nome inválido"}
        }
        
        const statusAtualizado = await TipoMaterial.findByIdAndUpdate(id.trim(), {nome: novoNome.trim()})
        
        if(!statusAtualizado){
            return {status: 404, message: `TipoMaterial com id ${id} não encontrado`}
        }

        return {status: 200}
    } catch (error) {
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
            return {status: 400, message: "Já existe um tipo de material com esse nome"}
        }
        
        console.error(`Erro ao atualizar TipoMaterial: `, error);
        return {status: 500, message: "Erro ao atualizar TipoMaterial" }
    }
}

exports.deleteTipoMaterial = async (id) => {
    try {
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }

        const antigoTipoMaterial = await TipoMaterial.findById(id.trim())
        
        if(!antigoTipoMaterial){
            return {status: 404, message: "TipoMaterial não encontrado"}
        }

        const resultadoMaterialService = await materialService.updateMaterialBy({idTipo: id.trim()}, {idTipo: process.env.TIPO_DELETADO})

        if(resultadoMaterialService.status !== 200 && resultadoMaterialService.status !== 404){
            return {status: resultadoMaterialService.status, message: resultadoMaterialService.message}
        }

        await antigoTipoMaterial.deleteOne()
        
        return {status: 200}
    }catch(error){
        console.error(`Erro ao deletar TipoMaterial ${id}`)
        return {status: 500, message: "Erro ao deletar TipoMaterial"}
    }
}