const service = require('../services/tipoMaterialService')
const validarIdMongoose = require('../utils/validarIdMongoose')

exports.getAll = async (_, res) => {
    try{
        const result = await service.getTipoMaterial()

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getByID = async (req, res) => {
    try{
        const id = req.params.id.trim()
    
        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }
    
        const result = await service.getTipoMaterialByID(id)
    
        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }

}

exports.create = async (req, res) => {
    try{
        let nome = req.body.nome

        if(!nome){
            return res.status(400).json({name: "Parameter Error", message: "Nome é obrigatorio"})
        }

        nome = nome.trim()

        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        await service.criarTipoMaterial(nome)

        return res.sendStatus(201)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        let id = req.params.id.trim()
        let nome = req.body.nome
        
        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        if(!nome){
            return res.status(400).json({name: "Parameter Error", message: "Nome é obrigatório"})   
        }

        nome = nome.trim()

        if(nome.trim().length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome invalido"})
        }

        await service.updateTipoMaterial(id, nome)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id.trim()
    
        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        await service.deleteTipoMaterial(id)
        
        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}