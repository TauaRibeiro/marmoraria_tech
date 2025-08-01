const TipoMaterial = require('../models/TipoMaterial')

exports.criarTipoMaterial = async (nome) => {
    try{
        if(nome.trim().length === 0 || nome.length < 3){
            return {status: 400, message: "Nome inválido"}
        }
    
        const result = await TipoMaterial.create({nome})

        return {status: 201, result}
    }catch(error){
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
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }
        const result = await TipoMaterial.findById(id);

        if(!result){
            return {status: 404}
        }

        return {status: 200, result}
    }catch(error){
        console.error(`Erro ao buscar TipoMaterial com id ${id}: `, error);

        return {status: 500, message: "Erro ao buscar TipoMaterial"}
    }
}

exports.updateTipoMaterial = async (id, novoNome) => {
    try {
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        if(novoNome.trim().length == 0){
            return {status: 400, message: "Nome inválido"}
        }
        
        const statusAtualizado = await TipoMaterial.findByIdAndUpdate(id, {nome: novoNome})
        
        if(!statusAtualizado){
            return {status: 404, message: `TipoMaterial com id ${id} não encontrado`}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao atualizar TipoMaterial: `, error);
        return {status: 500, message: "Erro ao atualizar TipoMaterial" }
    }
}

exports.deleteTipoMaterial = async (id) => {
    try {
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        const statusDeletado = await TipoMaterial.findByIdAndDelete(id)
        
        if(!statusDeletado){
            return {status: 404, message: "TipoMaterial não encontrado"}
        }

        return {status: 200}
    }catch(error){
        console.error(`Erro ao deletar TipoMaterial ${id}`)
        return {status: 500, message: "Erro ao deletar TipoMaterial"}
    }
}