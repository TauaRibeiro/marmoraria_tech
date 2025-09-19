const enderecoService = require('../services/enderecoService')
const eNumerio = require('../utils/eNumerico')

exports.create = async (req, res) => {
    try{
        let {cep, cidade, rua, numero, bairro, complemento} = req.body

        if(!cep ||!cidade ||!rua || !numero || !bairro){
            return res.status('Parameter Error', 400, 'Os parâmetros de cep, cidade, rua, numero e bairro são obrigatórios')
        }

        cep = (typeof(cep) === 'string') ? cep.trim().replace(',', '.') : cep.toString()
        cidade = cidade.trim()
        rua = rua.trim()
        bairro = bairro.trim()
        numero = (typeof(numero) === 'string') ? numero.trim() : numero.toString()
        if(complemento === undefined){
            complemento = null
        }else if(complemento !== null){
            complemento = complemento.trim()
        }

        if(cep.length === 0 || !eNumerio(cep) || cep.indexOf('.') !== -1){
            return res.status(400).json({name: "Validation Error", message: "CEP inválido"})
        }

        if(cidade.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Cidade inválida"})
        }

        if(rua.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Rua inválida"})
        }

        if(numero.length === 0 || !eNumerio(numero) || numero.indexOf('.') !== -1){
            return res.status(400).json({name: "Validation Error", message: "Número inválido"})
        }

        if(complemento && complemento.length === 0){
            return res.status(200).json({name: "Validation Error", message: "Complemento inválido"})
        }

        const result = await enderecoService.criarEndereco({cep, cidade, rua, numero, bairro, complemento})
        
        return res.status(201).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getAll = async (_, res) => {
    try{}catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getById = async (req, res) => {
    try{}catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{}catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{}catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}