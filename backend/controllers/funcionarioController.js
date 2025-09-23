const funcionarioService = require('../services/funcionarioService')
const validarId = require('../utils/validarIdMongoose')
const validarTelefone = require('../utils/validarTelefone')
const validarEmail = require('../utils/validarEmail')
const parseData = require('../utils/parseData')
const eNumerico = require('../utils/eNumerico')

exports.create = async (req, res) => {
    try{
        let {cpf, nome, dataNascimento, telefone, email, senha, eADM} = req.body
    
        if(!cpf || !nome || !dataNascimento || !telefone || !email || !senha){
            return res.status(400).json({name: "Parameter Error", message: "Os campos de cpf, nome, dataNascimento, telefone, email e senha são obrigatórios"})
        }
    
        cpf = (typeof(cpf) === 'number') ? cpf.toString() : cpf.trim()
        nome = nome.trim()
        dataNascimento = parseData(dataNascimento)
        telefone = (typeof(telefone) === 'number') ? telefone.toString() : telefone.trim()
        email = email.trim()
        senha = senha.trim()
        eADM = (typeof(eADM) === 'number') ? eADM.toString() : eADM.trim()
        
        
        if(cpf.length !== 11 || !eNumerico(cpf)){
            return res.status(400).json({name: "Validation Error", message: "CPF inválido"})
        }
    
        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }
    
        if(!validarTelefone(telefone)){
            return res.status(400).json({name: "Validation Error", message: "Telefone inválido"})
        }
    
        if(!validarEmail(email)){
            return res.status(400).json({name: "Validation Error", message: "Email inválido"})
        }
    
        if(senha.length < 4){
            return res.status(400).json({name: "Validation Error", message: "Senha inválida"})
        }

        if(!eNumerico(eADM) || parseInt(eADM) > 1 || parseInt(eADM) < 0){
            return res.status(400).json({name: "Validation Error", message: "Permissão inválida"})
        }

        if(parseInt(eADM) === 1){
            eADM = true
        }else{
            eADM = false
        }
    
        const novoFuncionario = await funcionarioService.createFuncionario({cpf, nome, dataNascimento, telefone, email, senha, eADM})
        
        return res.status(201).json({result: novoFuncionario})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getAll = async (_, res) => {
    try{
        const result = await funcionarioService.getFuncionario()

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        const result = await funcionarioService.getFuncionarioById(id)

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id
        let {cpf, nome, dataNascimento, telefone, email, senha, eADM} = req.body
        
        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        if(!cpf || !nome || !dataNascimento || !telefone || !email || !senha){
            return res.status(400).json({name: "Parameter Error", message: "Os campos de cpf, nome, dataNascimento, telefone, email e senha são obrigatórios"})
        }
    
        cpf = (typeof(cpf) === 'number') ? cpf.toString() : cpf.trim()
        nome = nome.trim()
        dataNascimento = parseData(dataNascimento)
        telefone = (typeof(telefone) === 'number') ? telefone.toString() : telefone.trim()
        email = email.trim()
        senha = senha.trim()
        eADM = (typeof(eADM) === 'number') ? eADM.toString() : eADM.trim()
    
        if(cpf.length !== 11 || !eNumerico(cpf)){
            return res.status(400).json({name: "Validation Error", message: "CPF inválido"})
        }
    
        if(nome.length === 0){
            return res.status(400).json({name: "Validation Error", message: "Nome inválido"})
        }
    
        if(!validarTelefone(telefone)){
            return res.status(400).json({name: "Validation Error", message: "Telefone inválido"})
        }
    
        if(!validarEmail(email)){
            return res.status(400).json({name: "Validation Error", message: "Email inválido"})
        }
    
        if(senha.length < 4){
            return res.status(400).json({name: "Validation Error", message: "Senha inválida"})
        }

        if(!eNumerico(eADM) || parseInt(eADM) > 1 || parseInt(eADM) < 0){
            return res.status(400).json({name: "Validation Error", message: "Permissão inválida"})
        }

        if(parseInt(eADM) === 1){
            eADM = true
        }else{
            eADM = false
        }

        const result = await funcionarioService.updateFuncionario({id, cpf, nome, dataNascimento, telefone, email, senha, eADM})

        return res.status(200).json({result})
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const {idAdm, idDelete} = req.params

        if(!validarId(idAdm)){
            return res.status(400).json({name: "Invalid Id", message: "Id do ADM inválido"})
        }

        if(!validarId(idDelete)){
            return res.status(400).json({name: "Invalid Id", message: "Id do funcionário inválido"})
        }
        
        await funcionarioService.deleteFuncionario(id)

        return res.sendStatus(200)
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}