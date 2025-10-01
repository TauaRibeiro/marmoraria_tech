const enderecoService = require('../services/enderecoService')
const eNumerio = require('../utils/eNumerico')
const validarId = require('../utils/validarIdMongoose')

exports.create = async (req, res) => {
    try{
        let {cep, cidade, rua, numero, bairro, complemento} = req.body

        if(!cep ||!cidade ||!rua || !numero || !bairro){
            return res.status(400).json({name: "Parameter Error", message: 'Os parâmetros de cep, cidade, rua, numero e bairro são obrigatórios'})
        }

        cep = (typeof(cep) === 'string') ? cep.trim().replace(',', '.') : cep.toString()
        cidade = cidade.trim()
        rua = rua.trim()
        bairro = bairro.trim()
        numero = (typeof(numero) === 'string') ? numero.trim() : numero.toString()
        complemento = (complemento) ? complemento.trim() : null

        if(cep.length !== 8 || !eNumerio(cep) || cep.indexOf('.') !== -1){
            return res.status(400).json({name: "Validation Error", message: "CEP inválido"})
        }

        if(cidade.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Cidade inválida"})
        }

        if(rua.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Rua inválida"})
        }

        if(bairro.length === 0 ){
            return res.status(400).json({name: "Validation Error", message: "Bairro inválido"})
        }

        if(numero.length === 0 || !eNumerio(numero) || numero.indexOf('.') !== -1){
            return res.status(400).json({name: "Validation Error", message: "Número inválido"})
        }

        const result = await enderecoService.criarEndereco({cep, cidade, rua, numero, bairro, complemento})
        
        return res.status(201).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getAll = async (_, res) => {
    try{
        const result = await enderecoService.getEndereco()

        return res.status(200).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        const result = await enderecoService.getEnderecoByID(id)

        return res.status(200).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }
    
        let {cep, cidade, rua, numero, bairro, complemento} = req.body

        if(!cep ||!cidade ||!rua || !numero || !bairro){
            return res.status(400).json({name: "Parameter Error", message: 'Os parâmetros de cep, cidade, rua, numero e bairro são obrigatórios'})
        }

        cep = (typeof(cep) === 'string') ? cep.trim().replace(',', '.') : cep.toString()
        cidade = cidade.trim()
        rua = rua.trim()
        bairro = bairro.trim()
        numero = (typeof(numero) === 'string') ? numero.trim() : numero.toString()
        complemento = (complemento) ? complemento.trim() : null

        if(cep.length !== 8 || !eNumerio(cep) || cep.indexOf('.') !== -1){
            return res.status(400).json({name: "Validation Error", message: "CEP inválido"})
        }

        if(cidade.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Cidade inválida"})
        }

        if(rua.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Rua inválida"})
        }

        if(bairro.length === 0 ){
            return res.status(400).json({name: "Validation Error", message: "Bairro inválido"})
        }

        if(numero.length === 0 || !eNumerio(numero) || numero.indexOf('.') !== -1){
            return res.status(400).json({name: "Validation Error", message: "Número inválido"})
        }

        const endereco = await enderecoService.updateEndereco({id, cep, cidade, rua, numero, bairro, complemento})

        return res.status(200).json({result: endereco})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        await enderecoService.deleteEndereco(id)

        return res.sendStatus(200)
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}