const clienteService = require('../services/clienteService')
const validarId = require('../utils/validarIdMongoose')
const parseData = require('../utils/parseData')
const validarEmail = require('../utils/validarEmail')
const validarTelefone = require('../utils/validarTelefone')
const eNumerico = require('../utils/eNumerico')

exports.getAll = async (_, res) => {
    try{
        const result = await clienteService.getCliente()

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.status, message: error.message})
    }
}

exports.getByID = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        const result = await clienteService.getClienteByID(id)

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.status, message: error.message})
    }
}

exports.create = async (req, res) => {
    try{
        let {idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj} = req.body

        if(!idEndereco || !nome || !email || !dataNascimento || !telefone || !cpf || !cnpj){
            return res.status(400).json({name: "Paremeter Error", message: "Os parâmetros idEndereco, nome, email, dataNascimento, telefone e cpf ou cnpj são obrigatórios "})
        }
        
        if(!cpf && !cnpj){
            return res.status(400).json({name: "Paremeter Error", message: "É necessário passar no mínimo CPF ou CNPJ"})
        }
        
        idEndereco = idEndereco.trim()
        nome = nome.trim()
        email = email.trim()
        dataNascimento = parseData(dataNascimento.trim())
        telefone = telefone.trim()
        cpf = cpf.trim()
        cnpj = cnpj.trim()
        

        if(!validarId(idEndereco)){
            return res.status(400).json({name: "Invalid Id", message: "Id de endereço inválido"})
        }

        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        if(!validarEmail(email)){
            return res.status(400).json({name: "Validation Error", message: "Email inválido"})
        }

        if(dataNascimento >= Date.now() || Date.now() - dataNascimento >= 100){
            return res.status(400).json({name: "Validation Error", message: "Data de nascimento inválida"})
        }

        if(Date.now() - dataNascimento < 18){
            return res.status(400).json({name: "Validation Error", message: "Cliente é menor de idade"})
        }
        
        if(!validarTelefone(telefone)){
            return res.status(400).json({name: "Validation Error", message: "Telefone inválido"})
        }


        if(cpf && (cpf.length !== 11 || !eNumerico(cpf))){
            return res.status(400).json({name: "Validaion Error", message: "CPF inválido"})
        }

        if(cnpj && (cnpj.length !== 11)){
            return res.status(400).json({name: "Validation Error", message: "CNPJ inválido"})
        }

        await clienteService.createCliente({idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj})

        return res.sendStatus(201)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        await clienteService.deleteCliente(id)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
   try{
        const id = req.params.id.trim()
        let {idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj} = req.body

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        if(!idEndereco || !nome || !email || !dataNascimento || !telefone || !cpf || !cnpj){
            return res.status(400).json({name: "Paremeter Error", message: "Os parâmetros idEndereco, nome, email, dataNascimento, telefone e cpf ou cnpj são obrigatórios "})
        }
        
        if(!cpf && !cnpj){
            return res.status(400).json({name: "Paremeter Error", message: "É necessário passar no mínimo CPF ou CNPJ"})
        }
        
        idEndereco = idEndereco.trim()
        nome = nome.trim()
        email = email.trim()
        dataNascimento = parseData(dataNascimento.trim())
        telefone = telefone.trim()
        cpf = cpf.trim()
        cnpj = cnpj.trim()
        

        if(!validarId(idEndereco)){
            return res.status(400).json({name: "Invalid Id", message: "Id de endereço inválido"})
        }

        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }

        if(!validarEmail(email)){
            return res.status(400).json({name: "Validation Error", message: "Email inválido"})
        }

        if(dataNascimento >= Date.now() || Date.now() - dataNascimento >= 100){
            return res.status(400).json({name: "Validation Error", message: "Data de nascimento inválida"})
        }

        if(Date.now() - dataNascimento < 18){
            return res.status(400).json({name: "Validation Error", message: "Cliente é menor de idade"})
        }
        
        if(!validarTelefone(telefone)){
            return res.status(400).json({name: "Validation Error", message: "Telefone inválido"})
        }


        if(cpf && (cpf.length !== 11 || !eNumerico(cpf))){
            return res.status(400).json({name: "Validaion Error", message: "CPF inválido"})
        }

        if(cnpj && (cnpj.length !== 11)){
            return res.status(400).json({name: "Validation Error", message: "CNPJ inválido"})
        }

        await clienteService.updateCliente({id, idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj})
   }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
   }
}