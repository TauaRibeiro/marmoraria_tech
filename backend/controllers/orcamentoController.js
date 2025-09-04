const orcamentoService = require('../services/orcamentoService')

module.exports = async (req, res) => {
    const resultado = await orcamentoService.createOrcamento(req.body)

    if(resultado.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultado.status).json({message: resultado.message})
}