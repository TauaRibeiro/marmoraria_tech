const Ambiente = require('../models/Ambiente')

exports.criarAmbiente = async (nome) => {
    try{
        if(nome.trim().length === 0 || nome.length < 3){
            return {status: 400, message: "Nome inválido"}
        }
    
        await Ambiente.create({nome})

        return {status: 201}
    }catch(error){
        console.error(`Erro ao criar ambiente ${nome}: ${error}`);
        return {status: 500, message: `Erro ao criar ambiente ${nome}`}
    }
}

exports.getAmbiente = async () => {
    try{
        const result = await Ambiente.find();

        return {status: 200, result}
    }catch(err){
        console.error('Erro ao pegar todos os ambientes')

        return {status: 500, message: "Erro ao pegar todos os ambientes"}
    }
}

exports.getAmbienteByID = async (id) => {
    try{
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }
        const result = await Ambiente.findById(id);

        if(!result){
            return {status: 404}
        }

        return {status: 200, result}
    }catch(error){
        console.error(`Erro ao buscar Ambiente com id ${id}: `, error);

        return {status: 500, message: "Erro ao buscar Ambiente"}
    }
}

exports.updateAmbiente = async (id, novoNome) => {
    try {
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        if(novoNome.trim().length == 0){
            return {status: 400, message: "Nome inválido"}
        }
        
        const statusAtualizado = await Ambiente.findByIdAndUpdate(id, {nome: novoNome})
        
        if(!statusAtualizado){
            return {status: 404, message: `Ambiente com id ${id} não encontrado`}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao atualizar ambiente: `, error);
        return {status: 500, message: "Erro ao atualizar ambiente" }
    }
}

exports.deleteAmbiente = async (id) => {
    try {
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        const statusDeletado = await Ambiente.findByIdAndDelete(id)
        
        if(!statusDeletado){
            return {status: 404, message: "Ambiente não encontrado"}
        }

        return {status: 200}
    }catch(error){
        console.error(`Erro ao deletar o Ambiente: ${id}`)

        return {status: 500, message: "Erro ao deletar o ambiente"}
    }
}