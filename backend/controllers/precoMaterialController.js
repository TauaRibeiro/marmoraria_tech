const precoMaterialService = require('../services/precoMaterialService')

exports.create = async (req, res) => {
    const resultadoService = await precoMaterialService.createPrecoMaterial(req.body)

    if(resultadoService.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}

exports.getAll = async (_, res) => {
    const resultadoService = await precoMaterialService.getAllPrecoMaterial()

    if(resultadoService.status === 200){
        return res.status().json({result: resultadoService.result})
    }

    return res.status(resultadoService.status).json({message: resultadoService.message})
}