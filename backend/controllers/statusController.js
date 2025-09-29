const statusService = require('../services/statusService')
const validarIdMongoose = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')

exports.getAll = async (_, res) => {
    try{
        const result = await statusService.getAllStatus()

        return res.status(200).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

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
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }    
}

exports.create = async (req, res) => {
    try{
        let {nome, eMutavel} = req.body
        
        if(!nome || !eMutavel){
            return res.status(400).json({name: "Parameter Error", message: "Nome e eMutável são obrigatórios"})
        }

        nome = nome.trim()
        eMutavel = (typeof(eMutavel) === 'number') ? eMutavel.toString() : eMutavel.trim()

        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        if(!eNumerico(eMutavel) || eMutavel != '1' || eMutavel != '0'){
            return res.status(400).json({name: "Validation Error", message: "Valor de eMutavel inválido"})
        }

        eMutavel = (eMutavel == '1') ? true : false

        const result = await statusService.criarStatus(nome, eMutavel)

        return res.status(201).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id.trim()
        let {nome, eMutavel} = req.body
    
        if(!validarIdMongoose(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }
        
        if(!nome || !eMutavel){
            return res.status(400).json({name: "Parameter Error", message: "Nome e eMutável são obrigatórios"})
        }

        nome = nome.trim()
        eMutavel = (typeof(eMutavel) === 'number') ? eMutavel.toString() : eMutavel.trim()

        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        if(!eNumerico(eMutavel) || eMutavel != '1' || eMutavel != '0'){
            return res.status(400).json({name: "Validation Error", message: "Valor de eMutavel inválido"})
        }

        eMutavel = (eMutavel == '1') ? true : false
    
        await statusService.updateStatus(id, nome, eMutavel)
    
        return res.sendStatus(200)
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

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
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}