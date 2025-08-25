const Material = require('../models/Material')
const validarId = require('../utils/validarIdMongoose')
const tipoMateiralService = require('./tipoMaterialService')
const serviceStatus = require('../services/statusService')

exports.createMaterial = async (data) => {
    let {idTipo, nome, estoque, estoqueMin, estoqueMax, idStatus} = data 

    try{
        if(!idTipo || !estoque || !nome || !estoqueMin || !estoqueMax){
            return {status: 400, message: "Id de tipo, estoque, nome, estoque mínimo, estoque máximo"}
        }
    
        if(!validarId(idTipo)){    
            return {status: 400, message: `Id de tipo inválido`}
        }
        
        if(idStatus && !validarId(idStatus)){
            return {status: 400, message: 'Id de status inválido'}
        }

        const resultadoServiceTipoMaterial = await tipoMateiralService.getTipoMaterialByID(idTipo)
        
        if(resultadoServiceTipoMaterial.status !== 200){
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
    
            if(estoqueMax < 0) invalidos.push('estoqueMax');
            if(estoqueMin < 0) invalidos.push('estoqueMin');
            if(estoque < 0) invalidos.push('estoque');
    
            return {status: 400, message: `O valor para ${invalidos} deve ser maior ou igual á zero`}
        }
    
        if(estoqueMax < estoqueMin){
            return {status: 400, message: "O estoque máximo não pode ser menor que o estoque mínimo"}
        }

        if(idStatus){
            const resultadoServiceStatus = await serviceStatus.getStatusByID(idStatus)

            if(resultadoServiceStatus.status !== 200){
                return {status: resultadoServiceStatus.status, message: resultadoServiceStatus.message}
            }
        }else if(estoque > estoqueMax){
            idStatus = process.env.ESTOQUE_TRANSBORDANDO    
        }else if(estoque === estoqueMax){
            idStatus = process.env.ESTOQUE_CHEIO
        }else if(estoque <= estoqueMin){
            idStatus = process.env.ESTOQUE_BAIXO
        }else{
            idStatus = process.env.OK
        }

        await Material.create({
            nome: nome.trim(), 
            estoqueMin, 
            estoqueMax, 
            estoque, 
            idTipo: idTipo.trim(), 
            idStatus: idStatus.trim()
        })

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

exports.getMaterialByStatusId = async (id) => {
    if(!id){
        return {status: 400, message: "O id do status é necessário"}
    }

    if(!validarId(id)){
        return {status: 400, message: "Id inválido"}
    }

    const result = await Material.find({idStatus: id.trim()})

    if(result.length === 0){
        return {status: 404, message: "Não foi encontrado nenhum material com esse id"}
    }

    return {status: 200, result}
}

exports.getMaterialById = async (id) => {
    try{
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }
    
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
    
        const result = await Material.findById(id.trim())
    
        if(!result){
            return {status: 404, message: "Material não encontrado"}
        }
    
        return {status: 200, result}
    }catch(error){
        console.error('Ocorreu um erro ao pegar material por Id: ', error)
        return {status: 500, result}
    }
}

exports.deleteMaterial = async (id) => {
    try{
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }
    
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
    
        const materialAntigo = await Material.findByIdAndDelete(id.trim())
    
        if(!materialAntigo){
            return {status: 404, message: "Material não encontrado"}
        }
    
        return {status: 200}
    }catch(error){
        console.log('Erro ao deletar material: ', error)
        return {status: 500, message: "Erro ao deletar material"}
    }
}

exports.updateMaterial = async (data) => {
    try {
        let {id, nome, estoqueMin, estoqueMax, estoque, idStatus, idTipo} = data;
    
        if(!id){
            return {status: 400, message: "Id do material é obrigatório"}
        }
    
        if(!validarId(id)){
            return {status: 400, message: "Id do material inválido"}
        }
    
        if(!nome || !estoqueMin || estoqueMax || estoque || idStatus || idTipo){
            return {status: 400, message: "Os parâmetros, nome, estoqueMin, estoqueMax, estoque, idStaus, idTipo são obrigatórios"}
        }
    
        if(!validarId(idStatus)){
            return {status: 400, message: "Id de status inválido"}
        }
    
        if(!validarId(idTipo)){
            return {status: 400, message: "Id de tipo inválido"}
        }
        
        
        if(nome.length === 0){
            return {status: 400, message: "Nome inválido"}
        }

        estoqueMin = parseInt(estoqueMin.trim())
        estoqueMax = parseInt(estoqueMax.trim())
        estoque = parseInt(estoque.tirm())
        
        if(isNaN(estoqueMax)){
            return {status: 400, message: "O valor para o estoque máximo deve ser um número inteiro válido"}
        }

        if(estoqueMax < 0){
            return {status: 400, message: "O valor para o estoque máximo deve ser maior ou igual à zero"}    
        }
        
        if(isNaN(estoqueMin)){
            return {status: 400, message: "O valor para o estoque mínimo deve ser um número inteiro válido"}
        }

        if(estoqueMin < 0){
            return {status: 400, message: "O valor para o estoque mínimo deve ser maior ou igual à zero"}    
        }

        if(isNaN(estoque)){
            return {status: 400, message: "O valor para o estoque deve ser um número inteiro válido"}
        }

        if(estoque < 0){
            return {status: 400, message: "O valor para o estoque deve ser maior ou igual à zero"}    
        }
    
        if(estoqueMax < estoqueMin){
            return {status: 400, message: "O estoque máximo não pode ser menor que o estoque mínimo"}
        }

        if(idStatus){
            const resultadoServiceStatus = await serviceStatus.getStatusByID(idStatus)
    
            if(resultadoServiceStatus.status !== 200){
                return {status: resultadoServiceStatus.status, message: resultadoServiceStatus.message}
            }
        }else if(estoque > estoqueMax){
            idStatus = process.env.ESTOQUE_TRANSBORDANDO    
        }else if(estoque === estoqueMax){
            idStatus = process.env.ESTOQUE_CHEIO
        }else if(estoque <= estoqueMin){
            idStatus = process.env.ESTOQUE_BAIXO
        }else{
            idStatus = process.env.OK
        }
    
        const resultadoServiceTipo = await tipoMateiralService.getTipoMaterialByID(idTipo.trim())

        if(resultadoServiceTipo.status !== 200){
            return {status: resultadoServiceTipo.status, message: resultadoServiceTipo.message}
        }
    
        const result = await Material.findByIdAndUpdate(id, {
            idTipo: idTipo.trim(),
            idStatus: idStatus.trim(),
            nome: nome.trim(),
            estoqueMin,
            estoqueMax,
            estoque
        })
    
        if(!result){
            return {status: 404, message: "Material não encontrado"}
        }
    
        return {status: 200}
    } catch (error) {
       console.log("Erro ao autalizar material", error)
       return {status: 500, message: "Erro ao atualizar material"} 
    }
}

exports.updateMaterialBy = async (filtro, data) => {
    try {
        let {id, nome, estoqueMin, estoqueMax, estoque, idStatus, idTipo} = data;
    
        if(!id){
            return {status: 400, message: "Id do material é obrigatório"}
        }
    
        if(!validarId(id)){
            return {status: 400, message: "Id do material inválido"}
        }
    
        if(!nome || !estoqueMin || estoqueMax || estoque || idStatus || idTipo){
            return {status: 400, message: "Os parâmetros, nome, estoqueMin, estoqueMax, estoque, idStaus, idTipo são obrigatórios"}
        }
    
        if(!validarId(idStatus)){
            return {status: 400, message: "Id de status inválido"}
        }
    
        if(!validarId(idTipo)){
            return {status: 400, message: "Id de tipo inválido"}
        }
        
        
        if(nome.length === 0){
            return {status: 400, message: "Nome inválido"}
        }

        estoqueMin = parseInt(estoqueMin.trim())
        estoqueMax = parseInt(estoqueMax.trim())
        estoque = parseInt(estoque.tirm())
        
        if(isNaN(estoqueMax)){
            return {status: 400, message: "O valor para o estoque máximo deve ser um número inteiro válido"}
        }

        if(estoqueMax < 0){
            return {status: 400, message: "O valor para o estoque máximo deve ser maior ou igual à zero"}    
        }
        
        if(isNaN(estoqueMin)){
            return {status: 400, message: "O valor para o estoque mínimo deve ser um número inteiro válido"}
        }

        if(estoqueMin < 0){
            return {status: 400, message: "O valor para o estoque mínimo deve ser maior ou igual à zero"}    
        }

        if(isNaN(estoque)){
            return {status: 400, message: "O valor para o estoque deve ser um número inteiro válido"}
        }

        if(estoque < 0){
            return {status: 400, message: "O valor para o estoque deve ser maior ou igual à zero"}    
        }
    
        if(estoqueMax < estoqueMin){
            return {status: 400, message: "O estoque máximo não pode ser menor que o estoque mínimo"}
        }

        if(idStatus){
            const resultadoServiceStatus = await serviceStatus.getStatusByID(idStatus)
    
            if(resultadoServiceStatus.status !== 200){
                return {status: resultadoServiceStatus.status, message: resultadoServiceStatus.message}
            }
        }else if(estoque > estoqueMax){
            idStatus = process.env.ESTOQUE_TRANSBORDANDO    
        }else if(estoque === estoqueMax){
            idStatus = process.env.ESTOQUE_CHEIO
        }else if(estoque <= estoqueMin){
            idStatus = process.env.ESTOQUE_BAIXO
        }else{
            idStatus = process.env.OK
        }
    
        const resultadoServiceTipo = await tipoMateiralService.getTipoMaterialByID(idTipo)

        if(resultadoServiceTipo.status !== 200){
            return {status: resultadoServiceTipo.status, message: resultadoServiceTipo.message}
        }
    
        const result = await Material.updateMany(filtro, {
            idTipo: idTipo.trim(),
            idStatus: idStatus.trim(),
            nome: nome.trim(),
            estoqueMin,
            estoqueMax,
            estoque
        })
    
        if(!result){
            return {status: 404, message: "Material não encontrado"}
        }
    
        return {status: 200}
    } catch (error) {
        console.log("Erro ao autalizar material", error)
        return {status: 500, message: "Erro ao atualizar material"} 
    }
}