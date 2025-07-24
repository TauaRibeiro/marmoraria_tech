const Endereco = require('../models/Endereco')

exports.criarEndereco = async (enderecoData) => {
    try{
        let { cep, cidade, rua, numero, bairro, complemento } = enderecoData
    
        if(!cep || !cidade || !rua || !numero || !bairro){
            return {status: 400, message: "Dados de cep, cidade, rua, número e bairro são obrigatórios"}
        }
    
        cep = cep.replace('-', '').trim()
        rua = rua.trim()
        numero = parseInt(numero.trim())
        bairro = bairro.trim()
        complemento = (complemento) ? complemento.trim() : null
        
        if(cep.length != 8 || isNaN(parseInt(cep))){
            return {staus: 400, message: "CEP inválido"}
        }
    
        if(isNaN(numero)){
            return {status: 400, message: "Número inválido"}
        }
    
        if(bairro.length == 0 || rua.length == 0){
            return {status: 400, message: "Rua e/ou bairro inválido(os)"}
        }
    
        Endereco.create({cep, cidade, rua, numero, bairro, complemento})

        return {status: 201}
    }catch(error){
        console.error(`Erro ao criar o endereço: `, error)
        return {status: 500, message: "Erro ao criar endereço"}
    }
}

exports.getEndereco = async (enderecoData) => {
    try{
        const { cep, cidade, rua, numero, bairro, complemento } = enderecoData
        
        if(cep || cidade){}
        
        const result = await Endereco.find();


        return {status: 200, result}
    }catch(error){
        console.error('Erro ao pegar os dados de endereço: ', error)
        return {status: 500, message: "Erro ao pegar os dados de endereço"}
    }
}

exports.getEnderecoByID = async (id) => {
    try {
        const result = await Endereco.findById(id)

        if(!result){
            return {status: 404, message: `O endereço de id ${id} não foi encontrado`}
        }

        return {status: 200, result}
    } catch (error) {
        console.error(`Erro ao tentar encontrar endereço de id ${id}: `, error)
        return {status: 500, message: `Erro ao tentar encontrar endereço de id ${id}: `}
    }
}