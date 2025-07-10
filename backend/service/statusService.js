const Status = require('../models/Status')

exports.criarStatus = async (nome) => {
    try{
        if(nome.trim().length === 0 || nome.length < 3){
            return {status: 400, message: "Nome inválido"}
        }
    
        await Status.create({nome})

        return {status: 201}
    }catch(error){
        console.error(`Erro ao criar status ${nome}: ${error}`);
        return {status: 500, message: `Erro ao criar status ${nome}`}
    }
}

exports.getStatus() = async () => {
    try{
        const result = await Status.find();

        return {status: 200, result}
    }catch(err){
        console
    }
}

exports.getStatusByID() = async (id) => {
    try{
        if(id.trim().length === 0){
            return {status: 400, message: "Id inválido"}
        }
        const result = await Status.findById(id);

        if(!result){
            return {status: 404}
        }

        return {status: 200, result}
    }catch(error){
        console.error(`Erro ao buscar Status com id ${id}: `, error);

        return {status: 500, message: "Erro ao buscar Status"}
    }
}

exports.updateStatus = async (id, novoNome) => {
    try {
        if(id.trim().length){
            return {status: 400, message: "Id inválido"}
        }

        if(novoNome.trim().length == 0){
            return {status: 400, message: "Nome inválido"}
        }
        
        const statusAtualizado = Status.findByIdAndUpdate(id, {nome: novoNome})
        
        if(!statusAtualizado){
            return {status: 404, message: `Status com id ${id} não encontrado`}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao atualizar status: `, error);
        return {status: 500, message: "Erro ao atualizar status" }
    }
}

exports.deleteStatus = async (id) => {
    try {
        if(id.trim().legth === 0){
            return {status: 400, message: "id inválido"}
        }

        const statusDeletado = await Status.findByIdAndDelete(id)
        
        if(!statusDeletado){
            return {status: 404}
        }

        return {status: 200}
    }catch(error){
        console.error(`Erro ao `)
    }
}