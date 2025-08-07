const Material = require('../models/Material')
const validarId = require('../utils/validarIdMongoose')
const tipoMateiralService = require('../services/tipoMaterialService')


exports.createMaterial = async (data) => {
    let {idTipo, nome, estoque, estoqueMin, estoqueMax} = data 

    try{
        if(!idTipo || !estoque || !nome || !estoqueMin || !estoqueMax){
            return {status: 400, message: "Id de tipo, id de status, "}
        }
    
        if(!validarId(idTipo)){
            const invalidos = []
    
            if(!validarId(idTipo)) invalidos.push(idTipo);
    
            return {status: 400, message: `Id inválido! ${invalidos}`}
        }
    
        const resultadoServiceTipoMaterial = await tipoMateiralService.getTipoMaterialByID(idTipo)
    
        if(resultadoServiceTipoMaterial!== 200){
            return {status: 404, message: `Tipo não encontrado`}
        }
        
        if(nome.length < 2){
            return {status: 400, message: "Nome inválido"}
        }
    
        estoqueMax = parseInt(estoqueMax)
        estoqueMin = parseInt(estoqueMin)
        estoque = parseInt(estoque)
    
        if(isNaN(estoqueMax) || isNaN(estoqueMin) || isNaN(estoque)){
            const invalidos = []
    
            if(isNaN(estoqueMax)) invalidos.push('estoqueMax');
            if(isNaN(estoqueMin)) invalidos.push('estoqueMin');
            if(isNaN(estoque)) invalidos.push('estoque');
    
            return {status: 400, message: `O valor para ${invalidos} deve ser um número inteiro válido`}
        }
    
        if(estoqueMax < 0 || estoqueMin < 0 || estoque < 0){
            const invalidos = []
    
            if(isNaN(estoqueMax)) invalidos.push('estoqueMax');
            if(isNaN(estoqueMin)) invalidos.push('estoqueMin');
            if(isNaN(estoque)) invalidos.push('estoque');
    
            return {status: 400, message: `O valor para ${invalidos} deve ser maior ou igual á zero`}
        }
    
        if(estoqueMax < estoqueMin){
            return {status: 400, message: "O estoque máximo não pode ser menos que o estoque mínimo"}
        }

        let idStatus
        
        if(estoque > estoqueMax){
            idStatus = process.env.ESTOQUE_TRANSBORDANDO    
        }else if(estoque === estoqueMax){
            idStatus = process.env.ESTOQUE_CHEIO
        }else if(estoque <= estoqueMin){
            idStatus = process.env.ESTOQUE_BAIXO
        }else{
            idStatus = process.env.OK
        }

        await Material.create({nome, estoqueMin, estoqueMax, estoque, idTipo, idStatus})

        return {status: 201}
    }catch(error){
        console.error('Erro ao criar novo Material: ', error)
        return {status: 500, message: "Erro ao criar novo material"}
    }
}

exports.getMaterial = async () => {
    try{
        const result = await Material.find();
    
        return {status: 200, result}
    }catch(error){
        console.error('Erro ao pegar os todos os itens de Material: ', error)
        return {status: 500, message: "Erro ao fazer get Material"}
    }
}