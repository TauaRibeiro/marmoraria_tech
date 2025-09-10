const Material = require('../models/schemas/Material')
const validarId = require('../utils/validarIdMongoose')
const tipoMateiralService = require('./tipoMaterialService')
const serviceStatus = require('../services/statusService')
const eNumerico = require('../utils/eNumerico')

exports.createMaterial = async (data) => {
    try{
        let {nome, estoqueMin, estoqueMax, estoque, idStatus, idTipo} = data;

        if(!nome || !estoqueMin || !estoqueMax || !estoque || !idTipo){
            return {status: 400, message: "Os parâmetros, nome, estoqueMin, estoqueMax, estoque, idTipo são obrigatórios"}
        }
    
        if(idStatus && !validarId(idStatus)){
            return {status: 400, message: "Id de status inválido"}
        }
    
        if(!validarId(idTipo)){
            return {status: 400, message: "Id de tipo inválido"}
        }
    
        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }

        if(!eNumerico(estoqueMin) || !eNumerico(estoqueMax) || !eNumerico(estoque)){
            return {status: 400, message: "O valor de estoque mínimo, estoque máximo e estoque devem ser um número válido"}
        }

        estoqueMin = parseInt(estoqueMin.trim())
        estoqueMax = parseInt(estoqueMax.trim())
        estoque = parseInt(estoque.trim())
        
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
    
        if(!nome || !estoqueMin || !estoqueMax || !estoque || !idTipo){
            return {status: 400, message: "Os parâmetros, nome, estoqueMin, estoqueMax, estoque, idStaus, idTipo são obrigatórios"}
        }
    
        if(idStatus && !validarId(idStatus)){
            return {status: 400, message: "Id de status inválido"}
        }
    
        if(!validarId(idTipo)){
            return {status: 400, message: "Id de tipo inválido"}
        }
    
        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }

        if(!eNumerico(estoqueMin) || !eNumerico(estoqueMax) || !eNumerico(estoque)){
            return {status: 400, message: "O valor de estoque mínimo, estoque máximo e estoque devem ser um número válido"}
        }

        estoqueMin = parseInt(estoqueMin.trim())
        estoqueMax = parseInt(estoqueMax.trim())
        estoque = parseInt(estoque.trim())
        
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
        let {nome, estoqueMin, estoqueMax, estoque, idStatus, idTipo} = data;
    
        if(!nome && !estoqueMin && !estoqueMax && !estoque && !idStatus && !idTipo){
            return {status: 400, message: "É necessário passar pelo menos algum dos campos (idTipo, idStatus, nome, estoqueMin, estoqueMax, estoque)"}
        }
    
        if(idStatus && !validarId(idStatus)){
            return {status: 400, message: "Id de status inválido"}
        }
    
        if(idTipo && !validarId(idTipo)){
            return {status: 400, message: "Id de tipo inválido"}
        }
        
        nome = (nome !== null && nome !== undefined) ? nome.trim():null
        
        if(estoqueMin !== null && estoqueMin !== undefined){
            if(typeof(estoqueMin) !== 'number'){
                estoqueMin = parseInt(estoqueMin.trim())
            }
        }else{
            estoqueMin = null
        }
        
        if(estoqueMax !== null && estoqueMax !== undefined){
            if(typeof(estoqueMax) !== 'number'){
                estoqueMax = parseInt(estoqueMax.trim())
            }
        }else{
            estoqueMax = null
        }
        
        if(estoque !== null && estoque !== undefined){
            if(typeof(estoque) !== 'number'){
                estoque = parseInt(estoque.trim())
            }
        }else{
            estoque = null
        }
        
    
        const materialAntigo = await Material.find(filtro)
        
        if(!materialAntigo){
            return {status: 404, message: "Material não encontrado"}
        }

        if(nome && nome.length === 0){
            return {status: 400, message: "Nome inválido"}
        }
    
        if(estoqueMax){
            if(isNaN(estoqueMax)){
                return {status: 400, message: "O valor para o estoque máximo deve ser um número inteiro válido"}
            }
    
            if(estoqueMax < 0){
                return {status: 400, message: "O valor para o estoque máximo deve ser maior ou igual à zero"}    
            }
        }
    
        if(estoqueMin){
            if(isNaN(estoqueMin)){
                return {status: 400, message: "O valor para o estoque mínimo deve ser um número inteiro válido"}
            }
    
            if(estoqueMin < 0){
                return {status: 400, message: "O valor para o estoque mínimo deve ser maior ou igual à zero"}    
            }
        }
    
        if(estoque){
            if(isNaN(estoque)){
                return {status: 400, message: "O valor para o estoque deve ser um número inteiro válido"}
            }
    
            if(estoque < 0){
                return {status: 400, message: "O valor para o estoque deve ser maior ou igual à zero"}    
            }
        }
    
        if(estoqueMax && estoqueMin){
            if(estoqueMax < estoqueMin){
                return {status: 400, message: "O estoque máximo não pode ser menor que o estoque mínimo"}
            }
        }
    
        if(estoqueMax && !estoqueMin){
            if(estoqueMax < materialAntigo.estoqueMin){
                return {status: 400, message: "O estoque máximo não pode ser menor que o estoque mínimo"}
            }
        }
        
        if(!estoqueMax && estoqueMin){
            if(materialAntigo.estoqueMax < estoqueMin){
                return {status: 400, message: "O estoque máximo não pode ser menor que o estoque mínimo"}
            }
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
    
        if(idTipo){
            const resultadoServiceTipo = await tipoMateiralService.getTipoMaterialByID(idTipo)
    
            if(resultadoServiceTipo.status !== 200){
                return {status: resultadoServiceTipo.status, message: resultadoServiceTipo.message}
            }
        }
    
        const result = await Material.updateMany(filtro, {
            idTipo: idTipo ?? materialAntigo.idTipo,
            idStatus: idStatus ?? materialAntigo.idStatus,
            nome: nome ?? materialAntigo.nome,
            estoqueMin: estoqueMin ?? materialAntigo.estoqueMin,
            estoqueMax: estoqueMax ?? materialAntigo.estoqueMax,
            estoque: estoque ?? materialAntigo.estoque
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