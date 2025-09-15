const statusService = require('../services/statusService')
const validarIdMongoose = require('../utils/validarIdMongoose')

exports.getAll = async (_, res) => {
    try{
        const result = await statusService.getAllStatus()

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

        const result = await statusService.getStatusByID(id)

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }    
}

exports.create = async (req, res) => {
    try{
        const nome = req.body.nome.trim()

        if(!nome){
            return res.status(400).json({name: "Paramenter Error", message: "Nome é obrigatório"})
        }
        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        await statusService.criarStatus(nome)
        return res.sendStatus(201)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id.trim()
        const nome = req.body.nome.trim()
    
        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        if(!nome){
            return res.status(400).json({name: "Parameter Error", message: "Nome é obrigatório"})
        }  
    
        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }
    
        await statusService.updateStatus(id, nome)
    
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

        await statusService.deleteStatus(id)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}