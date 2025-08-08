const serviceMaterial = require('../services/materialService')

exports.getAll = async (_, res) => {
    const resultado = await serviceMaterial.getMaterial()

    if(resultado.status === 200){
        return res.status(200).json({result: resultado.result})
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.create = async (req, res) => {
    const resultado = await serviceMaterial.createMaterial(req.body)

    if(resultado.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultado.status).json({message: resultado.message})
}