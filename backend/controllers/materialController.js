const serviceMaterial = require('../services/materialService')
const validarIdMongoose = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')

exports.getAll = async (_, res) => {
    try{
        const result = await serviceMaterial.getMaterial()

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        const result = await serviceMaterial.getMaterialById(id)

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.create = async (req, res) => {
    try{
        let { idStatus, idTipo, nome, estoqueMin, estoqueMax, estoque, valorMaterial } = req.body
        
        if(!idStatus || !idTipo || !nome || !estoqueMin || !estoqueMax || !estoque || !valorMaterial){
            if(estoque !== 0 && estoqueMax !== 0 && estoqueMin !== 0){
                return res.status(400).json({name: "Parameter Error", message: "Os campos idStatus, idTipo, nome, estoqueMin, estoqueMax, estoque, valorMaterial."})
            }
        }
    
        if(!eNumerico(estoqueMin) || !eNumerico(estoqueMax) || !eNumerico(estoque) || !eNumerico(valorMaterial)){
            return res.status(400).json({name: "Type Error", message: "O estoqueMin, estoqueMax, estoque e valorMaterial devem ser do tipo numérico"})
        }
    
        idStatus = idStatus.trim()
        idTipo = idTipo.trim()
        nome = nome.trim()
        estoqueMin = (typeof(estoqueMin) === 'string') ? parseInt(estoqueMin.trim()) : estoqueMin.toFixed(0)
        estoqueMax = (typeof(estoqueMax) === 'string') ? parseInt(estoqueMax.trim()) : estoqueMax.toFixed(0)
        estoque = (typeof(estoque) === 'string') ? parseInt(estoque.trim()) : estoque.toFixed(0)
        valorMaterial = (typeof(valorMaterial) === 'string') ? parseFloat(valorMaterial.trim()).toFixed(2) : valorMaterial.toFixed(2)
        
        if(!validarIdMongoose(idStatus)){
            return res.status(400).json({name: "Invalid Id", message: "Id de status inválido"})
        }

        if(!validarIdMongoose(idTipo)){
            return res.status(400).json({name: "Invalid Id", message: "Id de tipo inválido"})
        }

        if(estoque < 0 || estoqueMax < 0 || estoqueMin < 0 || valorMaterial < 0){
            return res.status(400).json({name: "Validation Error", message: "Os valores de estoque, estoqueMax, estoqueMin e valorMateiral devem ser maiores ou igual à zero"})
        }
    
        if(estoqueMax < estoqueMin){
            return res.status(400).json({name: "Validation Error", message: "O estoqueMax não pode ser menor que o que estoqueMin"})
        }
    
        if(nome.length  === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        await serviceMaterial.createMaterial({idStatus, idTipo, nome, estoqueMin, estoqueMax, estoque, valorMaterial})

        return res.sendStatus(201)
    }catch(error){
        return res.status(error.message).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        await serviceMaterial.deleteMaterial(id)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.status, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: 'Id de material inválido'})
        }

        let { idStatus, idTipo, nome, estoqueMin, estoqueMax, estoque, valorMaterial } = req.body
    
        if(!idStatus || !idTipo || !nome || !estoqueMin || !estoqueMax || !estoque || !valorMaterial){
            return res.status(400).json({name: "Parameter Error", message: "Os campos idStatus, idTipo, nome, estoqueMin, estoqueMax, estoque, valorMaterial."})
        }
    
        if(!eNumerico(estoqueMin) || !eNumerico(estoqueMax) || !eNumerico(estoque) || !eNumerico(valorMaterial)){
            return res.status(400).json({name: "Type Error", message: "O estoqueMin, estoqueMax, estoque e valorMaterial devem ser do tipo numérico"})
        }
    
        idStatus = idStatus.trim()
        idTipo = idTipo.trim()
        nome = nome.trim()
        estoqueMin = (typeof(estoqueMin) === 'string') ? parseInt(estoqueMin.trim()) : estoqueMin.toFixed(0)
        estoqueMax = (typeof(estoqueMax) === 'string') ? parseInt(estoqueMax.trim()) : estoqueMax.toFixed(0)
        estoque = (typeof(estoque) === 'string') ? parseInt(estoque.trim()) : estoque.toFixed(0)
        valorMaterial = (typeof(valorMaterial) === 'string') ? parseFloat(valorMaterial.trim()).toFixed(2) : valorMaterial.toFixed(2)
        
        if(!validarIdMongoose(idStatus)){
            return res.status(400).json({name: "Invalid Id", message: "Id de status inválido"})
        }

        if(!validarIdMongoose(idTipo)){
            return res.status(400).json({name: "Invalid Id", message: "Id de tipo inválido"})
        }

        if(estoque < 0 || estoqueMax < 0 || estoqueMin < 0 || valorMaterial < 0){
            return res.status(400).json({name: "Validation Error", message: "Os valores de estoque, estoqueMax, estoqueMin e valorMateiral devem ser maiores ou igual à zero"})
        }
    
        if(estoqueMax < estoqueMin){
            return res.status(400).json({name: "Validation Error", message: "O estoqueMax não pode ser menor que o que estoqueMin"})
        }
    
        if(nome.length  === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        await serviceMaterial.createMaterial({id, idStatus, idTipo, nome, estoqueMin, estoqueMax, estoque, valorMaterial})

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}
