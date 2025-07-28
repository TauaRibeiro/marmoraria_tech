const enderecoService = require('../services/enderecoService')

exports.create = async (req, res) => {
    const resultService = await enderecoService.criarEndereco(req.body)

    if(resultService.status == 201){
        return res.sendStatus(201)
    }
    
    return res.status(resultService.status).json({message: resultService.message})
}

exports.getAll = async (_, res) => {
    const resultService = await enderecoService.getEndereco()

    if(resultService.status == 200){
        return res.status(200).json({result: resultService})
    }

    return res.status(resultService.status).json({message: resultService.message})
}

exports.getById = async (req, res) => {
    const resultService = await enderecoService.getEnderecoByID(req.params.id)

    if(resultService.status == 200){
        return res.status(200).json({result: resultService.result})
    }

    return res.status(resultService.status).json({message: resultService.message})
}

exports.update = async (req, res) => {
    const resultService = await enderecoService.updateEndereco(req.params.id, req.body)

    if(resultService.status == 200){
        return res.sendStatus(200)
    }

    return res.status(resultService.status).json({message: resultService.message})
}

exports.delete = async (req, res) => {
    const resultService = await enderecoService.deleteEndereco(req.params.id)

    if(resultService.status == 200){
        return res.sendStatus(200)
    }

    return res.status(resultService.status).json({message: resultService.message})
}