const precoMaterialService = require('../services/precoMaterialService')

exports.create = async (req, res) => {
    const resultadoService = await precoMaterialService.createPrecoMaterial(req.body)

    if(resultadoService.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}