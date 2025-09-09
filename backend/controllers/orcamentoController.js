const orcamentoService = require('../services/orcamentoService')

exports.create = async (req, res) => {
    const resultado = await orcamentoService.createOrcamento(req.body)

    if(resultado.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.getAll = async (_, res) => {
    const resultado = await orcamentoService.getOrcamento()

    if(resultado.status === 200){
        return res.status(200).json({result: resultado.result})
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.getById = async (req, res) => {
    const resultado = await orcamentoService.getOrcamentoById(req.params.id)

    if(resultado.status === 200){
        return res.status(200).json({result: resultado.result})
    }

    return res.status(resultado.status).json({message: resultado.message})
}