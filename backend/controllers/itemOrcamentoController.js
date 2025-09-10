const itemOrcamentoService = require('../services/itemOrcamentoService')

exports.create = async (req, res) => {
    const resultado = await itemOrcamentoService.createItemOrcamento(req.body)

    if(resultado.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultado.status).json({message: resultado.message})
}