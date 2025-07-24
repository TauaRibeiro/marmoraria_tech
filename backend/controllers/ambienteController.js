const ambienteService = require('../services/ambieteService')

exports.getAll = async (req, res) => {
    const resultService = await ambienteService.getAmbiente();

    if(resultService.status === 200){
        return res.status(200).json({result: resultService.result})
    }

    console.log('Deu erro!!')
    console.log(resultService)
    return res.status(resultService.status).json({message: resultService.message})
}

exports.getById = async (req, res) => {
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: "O id é necessário"})
    }

    const resultService = await ambienteService.getAmbienteByID(id)

    if(resultService.status === 200){
        return res.status(200).json({result: resultService.result})
    }

    if(resultService.status === 404){
        return res.status(404).json({message: "Id não encontrado"})
    }

    return res.status(resultService.status).json({message: resultService.message})
}

exports.create = async (req, res) => {
    const {nome} = req.body;

    if(!nome){
        return res.status(400).json({message: "Nome é necessário"})
    }

    const resultService = await ambienteService.criarAmbiente(nome)

    if(resultService.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultService.status).json({message: resultService.message})
}

exports.update = async (req, res) => {
    const {id} = req.params
    const {nome} = req.body

    if(!id || !nome){
        return res.status(400).json({message: "id e nome são necessários"})
    }

    const resultService = await ambienteService.updateAmbiente(id, nome)

    if(resultService.status === 200){
       return res.sendStatus(200)
    }

    return res.status(resultService.status).json({message: resultService.message})
}

exports.delete = async (req, res) => {
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: "id é necessário"})
    }

    const resultService = await ambienteService.deleteAmbiente(id)

    if(!resultService.status === 200){
        return res.sendStatus(200);
    }

    return res.status(resultService.status).json({message: resultService.message})
}