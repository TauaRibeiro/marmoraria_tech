const Cliente = require('../models/Cliente')
const validarId = require('../utils/validarIdMongoose')
const validarData = require('../utils/validarData')
const validarTelefone = require('../utils/validarTelefone')
const enderecoService = require('../services/enderecoService')
const validarEmail = require('../utils/validarEmail')
const eNumerico = require('../utils/eNumerico')

exports.getCliente = async () => {
    try{
        const result = await Cliente.find()

        return {status: 200, result}
    }catch(error){
        console.error('Erro ao fazer o get de cliente', error)

        return {status: 500, message: "Erro ao fazer get de cliente"}
    }
}

exports.createCliente = async (data) => {
    try {
        const {idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj} = data
        
        if(!idEndereco || !nome || !email || !dataNascimento || !telefone || (!cpf && !cnpj)){
            return {status: 400, message: "Os campos de idEndereco, nome, email, dataNascimento, telefone, cpf e cnpj são obrigatórios"}
        }
        
        if(!validarId(idEndereco.trim())){
            return {status: 400, message: "Id de endereco inválido"}
        }
    
        const resultadoService = await enderecoService.getEnderecoByID(idEndereco)
    
        if(resultadoService.status !== 200){
            return {status: resultadoService.status, message: resultadoService.message}
        }

        if(nome.trim().length === 0){
            return {status: 400, message: "Nome inválido"}
        }
    
        if(!validarData(dataNascimento)){
            return {status: 400, message: "Data de nascimento inválida"}
        }
    
        if(!validarEmail(email)){
            return {status: 400, message: "Email inválido"}
        }
    
        if(!cpf && !cnpj){
            return {status: 400, message: "Deve ser passado pelo meno o CPF ou o CNPJ do cliente"}
        }
    
        if(cpf && (cpf.trim().length !== 11 || !eNumerico(cpf.trim()))){
            return {status: 400, message: "CPF inválido"}
        }
    
        if(cnpj && (cnpj.length !== 14 || !eNumerico(cnpj.trim()))){
            return {status: 400, message: "CNPJ inválido"}
        }
    
        if(!validarTelefone(telefone)){
            return {status: 400, message: "Telefone inválido"}
        }

        await Cliente.create({
            idEndereco: idEndereco.trim(), 
            nome: nome.trim(), 
            email: email.trim(), 
            dataNascimento, 
            telefone: telefone.trim(), 
            cpf: (cpf) ? cpf.trim(): null, 
            cnpj: (cnpj) ? cnpj.trim():null})

        return {status: 201}
    } catch (error) {
        console.error('Erro ao criar cliente')
        
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
            let duplicata = await Cliente.findOne({email: data.email.trim()})

            if(duplicata){
                return {status: 400, message: "O email providenciado já pertence à um outro cliente"}
            }

            duplicata = await Cliente.findOne({telefone: data.telefone.trim()})

            if(duplicata){
                return {status: 400, message: "O telefone providenciado já pertence à um outro cliente"}
            }

            duplicata = await Cliente.findOne({cpf: data.cpf.trim()})

            if(duplicata){
                return {status: 400, message: "O CPF providenciado já pertence à um outro cliente"}
            }

            duplicata = await Cliente.findOne({cnpj: data.cnpj.trim()})

            if(duplicata){
                return {status: 400, message: "O CNPJ providenciado já pertence à um outro cliente"}
            }
            
        }
        
        console.error(error)
        return {status: 500, message: "Erro ao criar cliente"}
    }
    
}