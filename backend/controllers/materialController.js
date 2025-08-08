const serviceMaterial = require('../services/materialService')

exports.getAll = async (_, res) => {
    const resultado = await serviceMaterial.getMaterial()

    if(resultado.status === 200){
        return res.status(200).json({result: resultado.result})
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.getById = async (req, res) => {
    const resultado = await serviceMaterial.getMaterialById(req.params.id)

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

exports.delete = async (req, res) => {
    const resultado = await serviceMaterial.deleteMaterial(req.params.id)

    if(resultado.status === 200){
        return res.sendStatus(200)
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.update = async (req, res) => {
    const resultado = await serviceMaterial.updateMaterial({id: req.params.id, ...req.body})

    if(resultado.status === 200){
        return res.sendStatus(200)
    }

    return res.status(resultado.status).json({message: resultado.message})
}
