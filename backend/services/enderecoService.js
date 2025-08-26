const Endereco = require('../models/Endereco')
const eNumerico = require('../utils/eNumerico')
const validarId = require('../utils/validarIdMongoose')

exports.criarEndereco = async (enderecoData) => {
    try{
        var { cep, cidade, rua, numero, bairro, complemento } = enderecoData
    
        if(!cep || !cidade || !rua || !numero || !bairro){
            return {status: 400, message: "Dados de cep, cidade, rua, número e bairro são obrigatórios"}
        }
        
        cep = cep.trim()
        rua = rua.trim()
        bairro = bairro.trim()
        complemento = (complemento) ? complemento.trim() : null
        
        if(cep.length != 8 || !eNumerico(numero)){
            return {status: 400, message: "CEP inválido"}
        }
        
        if(bairro.length == 0 || rua.length == 0){
            return {status: 400, message: "Rua ou bairro inválido(os)"}
        }
        
        if(!eNumerico(numero)){
            return {status: 400, message: "Número do endereço inválido"}
        }
        
        const result = await Endereco.create({cep, cidade, rua, numero, bairro, complemento})

        return {status: 201, result}
    }catch(error){
        if(error.codeName == 'DuplicateKey' || error.code === 11000){
            let duplicata = await Endereco.findOne({cep: numero.trim()})

            if(duplicata){
                return {status: 400, message: "Já existe um endereço com esse CEP"}
            }
        }
        console.error(`Erro ao criar o endereço: `, error)
        return {status: 500, message: "Erro ao criar endereço"}
    }
}

exports.getEndereco = async () => {
    try{
        return {status: 200, result: await Endereco.find()}
    }catch(error){
        console.error('Erro ao pegar os dados de endereço: ', error)
        return {status: 500, message: "Erro ao pegar os dados de endereço"}
    }
}

exports.getEnderecoByID = async (id) => {
    try {
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }

        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }

        const result = await Endereco.findById(id.trim())

        if(!result){
            return {status: 404, message: `O endereço não foi encontrado`}
        }

        return {status: 200, result}
    } catch (error) {
        console.error(`Erro ao tentar encontrar endereço de id ${id}: `, error)
        return {status: 500, message: `Erro ao tentar encontrar endereço de id ${id}: `}
    }
}

exports.updateEndereco = async (id, data) => {
    try {
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }

        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
        
        const antigoEndereco = await Endereco.findById(id.trim())
        
        if(!antigoEndereco){
            return {status: 404, message: "Endereço não encontrado"}
        }
        
        var {cep, cidade, rua, numero, bairro, complemento} = data
        
        if(!cep || !cidade || !numero || !rua || !bairro){
            return {status: 400, message: "É os campos cep, cidade, rua, numero e bairro são obrigatórios"}
        }
        
        if(cep.length != 8 || !eNumerico(cep.trim())){
            return {status: 400, message:"CEP inválido"}
        }
    
        if(cidade.trim().length == 0){
            return {status: 400, message: "Cidade inválida"}
        }
    
        if(rua.trim().length == 0){
            return {status: 400, message: "Rua inválida"}
        }
    

        if(!eNumerico(numero)){
            return {status: 400, message: "Número inválido"}
        }

        numero = parseInt(numero.trim())
        
    
        if(bairro.trim().length == 0){
            return {status: 400, message: "Bairro inválido"}
        }
        
        if(complemento && complemento.trim().length == 0){
            complemento = null
        }else if(!complemento){
            complemento = antigoEndereco.complemento 
        }

        await Endereco.findByIdAndUpdate(id, {
            cep: cep ?? antigoEndereco.cep,
            cidade: cidade ?? antigoEndereco.cidade,
            rua: rua ?? antigoEndereco.rua,
            numero: numero ?? antigoEndereco.numero,
            bairro: bairro ?? antigoEndereco.bairro,
            complemento
        })

        return {status: 200}
    } catch (error) {
        console.error("Erro ao atualizar o endereço: \b")

        if(error.codeName == 'DuplicateKey'){
            const duplicata = await Endereco.findOne({cep: cep.trim()})

            if(duplicata && duplicata._id != id){
                console.error(`Já existe um endereço de CEP ${cep}`)
                return {status: 400, message: "Já existe um endereço com este CEP"}
            }
        }

        console.error(error)

        return {status: 500, message: 'Erro ao atualizar o endereço'}
    }

}

exports.deleteEndereco = async (id) => {
    try {
        if(!id){
            return {status: 400, message: "Id é obrigatório"}
        }

        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }

        const enderecoAntigo = await Endereco.findByIdAndDelete(id.trim())

        if(!enderecoAntigo){
            return {status: 404, message: "Endereço não encontrado"}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao deletar endereço de id ${id}`)
        return {status: 500, message: "Erro ao deletar endereco"}
    }
}