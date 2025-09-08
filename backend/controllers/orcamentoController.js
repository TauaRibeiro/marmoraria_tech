const orcamentoService = require('../services/orcamentoService')

exports.create = async (req, res) => {
    const resultado = await orcamentoService.createOrcamento(req.body)

    if(resultado.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.get = async (req, res) => {
    const resultado = await orcamentoService.getOrcamento()

    if(resultado.status === 200){
        return {status: 200, result: resultado.result}
    }

    return res.status(resultado.status).json({message: resultado.message})
}