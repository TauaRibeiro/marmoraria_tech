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

exports.updateEndereco = async (id, data) => {
    try {
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        const antigoEndereco = await Endereco.findById(id)

        if(!antigoEndereco){
            return {status: 404, message: "Endereço não encontrado"}
        }
        
        let {cep, cidade, rua, numero, bairro, complemento} = data
    
        if(!cep && !cidade && !numero && !rua && !bairro && !complemento){
            return {status: 400, message: "É preciso ser passado pelo menos um dos campos de endereço (cep, cidade, rua, numero, bairro, complemento)"}
        }
    
        cep = (cep) ? cep.replace('-', '').trim() : null
        cidade = (cidade) ? cidade.trim() : null
        rua = (rua) ? rua.trim() : null
        numero = (numero) ? parseInt(rua.trim()) : null
        bairro = (bairro) ? bairro.trim() : null
        complemento = (complemento) ? complemento.trim() : null
        
        if(!cep && cep.length == 0 && isNaN(parseInt(cep))){
            return {status: 400, message:"CEP inválido"}
        }
    
        if(!cidade && cidade.length == 0){
            return {stauts: 400, message: "Cidade inválida"}
        }
    
        if(!rua && rua.length == 0){
            return {status: 400, message: "Rua inválida"}
        }
    
        if(!numero && isNaN(numero)){
            return {status: 400, message: "Número inválido"}
        }
    
        if(!bairro && bairro.length == 0){
            return {status: 400, message: "Bairro inválido"}
        }

        await Endereco.findByIdAndUpdate(id, {
            cep: cep ?? antigoEndereco.cep,
            cidade: cidade ?? antigoEndereco.cidade,
            rua: rua ?? antigoEndereco.rua,
            numero: numero ?? antigoEndereco.numero,
            bairro: bairro ?? antigoEndereco.bairro,
            complemento: complemento ?? antigoEndereco.complemento,
        })

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao atualizar endereço de ID ${id} e com os seguitnes valores ${data}`)

        return {status: 500, message: 'Erro ao atualizar o endereço'}
    }

}

exports.deleteEndereco = async (id) => {
    try {
        if(id.trim().length === 0 || id.length < 24 || id.length > 24){
            return {status: 400, message: "Id inválido"}
        }

        const enderecoAntigo = Endereco.findByIdAndDelete(id)

        if(!enderecoAntigo){
            return {staus: 404, message: "Endereço não encontrado"}
        }

        return {status: 200}
    } catch (error) {
        console.error(`Erro ao deletar endereço de id ${id}`)
        return {status: 500, message: "Erro ao deletar endereco"}
    }
}