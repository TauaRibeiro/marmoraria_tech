const clienteService = require('../services/clienteService')

exports.create = async (req, res) => {
    const resultadoService = await clienteService.createCliente(req.body)

    if(resultadoService.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}