const clienteService = require('../services/clienteService')

exports.getAll = async (_, res) => {
    const resultadoService = await clienteService.getCliente()

    if(resultadoService.status === 200){
        return {status: 200, result: resultadoService.result}
    }

    return {status: resultadoService.status, message: resultadoService.message}
}

exports.create = async (req, res) => {
    const resultadoService = await clienteService.createCliente(req.body)

    if(resultadoService.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}