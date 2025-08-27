const Status = require('../models/Status')
const materialService = require('../services/materialService')
const validarId = require('../utils/validarIdMongoose')

exports.criarStatus = async (nome) => {
    try{
        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }
    
        await Status.create({nome: nome.trim()})

        return {status: 201}
    }catch(error){
        if(error.code === 11000){
            return {status: 400, message: "Já existe um status com esse nome"}
        }
        
        console.error(`Erro ao criar status: `);
        console.error(error)
        return {status: 500, message: `Erro ao criar status`}
    }
}

exports.getStatus = async () => {
    try{
        const result = await Status.find();

        return {status: 200, result}
    }catch(err){
        console.error('Erro ao pegar todos os status')

        return {status: 500, message: "Erro ao pegar todos os status"}
    }
}

exports.getStatusByID = async (id) => {
    try{
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
        const result = await Status.findById(id.trim());

        if(!result){
            return {status: 404, message: "Status não encontrado"}
        }

        return {status: 200, result}
    }catch(error){
        console.error(`Erro ao buscar Status com id ${id}: `, error);

        return {status: 500, message: "Erro ao buscar Status"}
    }
}

exports.updateStatus = async (id, novoNome) => {
    try {
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }

        if(novoNome.trim().length == 0){
            return {status: 400, message: "Nome inválido"}
        }
        
        const statusAntigo = await Status.findById(id.trim())

        if(!statusAntigo){
            return {status: 404, message: `Status com id ${id} não encontrado`}
        }
        
        if(process.env[statusAntigo.nome.toUpperCase().replace(' ', '_')]){
            return {status: 400, message: "Não é possível alterar um status padrão"}
        }
        
        // const statusAtualizado = await Status.findByIdAndUpdate(id.trim(), {nome: novoNome.trim()})
        
        await statusAntigo.updateOne({nome: novoNome.trim()})

        return {status: 200}
    } catch (error) {
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
            return {status: 400, message: "Já existe um status com esse nome"}
        }

        console.error(`Erro ao atualizar status: `, error);
        return {status: 500, message: "Erro ao atualizar status" }
    }
}

exports.deleteStatus = async (id) => {
    try {
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
        
        const statusDeletado = await Status.findById(id.trim())
              
        if(!statusDeletado){
            return {status: 404, message: "Status não encontrado"}
        }

        if(process.env[statusDeletado.nome.toUpperCase().replace(' ', '_')]){
            return {status: 400, message: "Não é possível deletar um status padrão"}
        }
        const resultadoMaterialService = await materialService.updateMaterialBy({idStatus: id.trim()},{idStatus: process.env.STATUS_DELETADO})
        
        if(resultadoMaterialService.status !== 200 && resultadoMaterialService.status !== 404){
            return {status: resultadoMaterialService.status, message: resultadoMaterialService.message} 
        }
        
        await statusDeletado.deleteOne()

        return {status: 200}
    }catch(error){
        console.error(`Erro ao deletar os Status: `, error)

        return {status: 500, message: "Erro ao deletar os status"}
    }
}