const ambienteService = require('../services/ambienteService')
const validarId = require('../utils/validarIdMongoose')

exports.getAll = async (_, res) => {
    try{
        const result = await ambienteService.getAmbiente()

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: 'Invalid Id', message: "Id inválido"})
        }

        const result = await ambienteService.getAmbienteByID(id)

        if(!result){
            return res.status(404).json({name: "Not Found", message: "Ambiente não encotrado"})
        }

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.create = async (req, res) => {
    try{
        let nome = req.body.nome

        if(!nome){
            return res.status(400).json({name: "Parameter Error", message: "Nome é obrigatório"})
        }

        nome = nome.trim()

        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        await ambienteService.criarAmbiente(nome)

        return res.sendStatus(201)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        let nome = req.body.nome
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: 'Invalid Id', message: "Id inválido"})
        }

        if(!nome){
            return res.status(400).json({name: "Parameter Error", message: "Nome é obrigatório"})
        }

        nome = nome.trim()
        
        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        await ambienteService.updateAmbiente(id, nome)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: 'Invalid Id', message: "Id inválido"})
        }

        await ambienteService.deleteAmbiente(id)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}