const funcionarioService = require('../services/funcionarioService')

exports.create = async (req, res) => {
    const resultado = await funcionarioService.createFuncionario(req.body)

    if(resultado.status === 201){
        return res.sendStatus(201)
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.getAll = async (_, res) => {
    const resultado = await funcionarioService.getFuncionario()

    if(resultado.status === 200){
        return res.status(200).json({result: resultado.result})
    }

    return res.status(resultado.status).json({result: resultado.result})
}

exports.getById = async (req, res) => {
    const resultado = await funcionarioService.getFuncionarioById(req.params.id)

    if(resultado.status === 200){
        return res.status(200).json({result: resultado.result})
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.update = async (req, res) => {
    const resultado = await funcionarioService.updateFuncionario({id: req.params.id, ...req.body})

    if(resultado.status === 200){
        return res.sendStatus(200)
    }

    return res.status(resultado.status).json({message: resultado.message})
}

exports.delete = async (req, res) => {
    const resultado = await funcionarioService.updateFuncionario(req.params.id)

    if(resultado.status === 200){
        return res.sendStatus(200)
    }

    return res.status(resultado.status).json({message: resultado.message})
}