const clienteService = require('../services/clienteService')

exports.getAll = async (_, res) => {
    const resultadoService = await clienteService.getCliente()

    if(resultadoService.status === 200){
        return res.status(200).json({result: resultadoService.result})
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}

exports.getByID = async (req, res) => {
    const resultadoService = await clienteService.getClienteByID(req.params.id)
    
    if(resultadoService.status === 200){
        return res.status(200).json({result: resultadoService.result})
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}

exports.create = async (req, res) => {
    const resultadoService = await clienteService.createCliente(req.body)

    if(resultadoService.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}

exports.delete = async (req, res) => {
    const resultadoService = await clienteService.deleteCliente(req.params.id)

    if(resultadoService.status === 200){
        return res.sendStatus(200)
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}