const DataError = require('./DataError')
const database = require('mongoose')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')

const orcamentoSchema = new database.Schema({
    idCliente: {
        type: database.Schema.ObjectId,
        ref: 'Cliente',
        required: true
    },
    idStatus: {
        type: database.Schema.ObjectId,
        ref: 'Status',
        required: true
    },
    valorPagamento: {type: Number, required: true},
    valorFrete: {type: Number, default: 0},
    valorInstalacao: {type: Number, default: 0}
});

class Orcamento{
    static database = database.model('Orcamento', orcamentoSchema)

    static async findOrcamento(id){
        try{
            if(!validarId(id.trim())){
                throw new DataError('Invalid ID', 400, 'O id do orçamento é inválido')
            }
    
            const orcamento = await Orcamento.database.findById(id.trim())
    
            if(!orcamento){
                throw new DataError('Invalid ID', 400, 'Orcamento não encontrado')
            }
    
            return orcamento
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error(error)
                throw new DataError('Internal Server Error', 500, 'Erro interno do servidor')
            }

            throw error
        }
    }

    static async getAllOrcamentos(){
        try{
            return Orcamento.database.find()
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error(error)
                throw new DataError('Internal Server Error', 500, 'Erro interno do servidor')
            }

            throw error
        }
    }

    constructor (idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao){
        if(!validarId(idCliente.trim())){
            throw new DataError('Invalid ID', 400, 'O id de cliente é inválido')
        }

        this.idCliente = idCliente.trim()

        if(!validarId(idStatus.trim())){
            throw new DataError('Invalid ID', 400, 'O id de status é inválido')
        }
        
        this.idStatus = idStatus.trim()

        valorPagamento = valorPagamento.replace(',', '.').trim()

        if(!eNumerico(valorPagamento)){
            throw new DataError('Type Error', 400, 'O valor de pagamento deve ser do tipo númerico')
        }

        valorPagamento = parseFloat(valorPagamento).toFixed(2)

        if(valorPagamento < 0){
            throw new DataError('Validation Error', 400, 'O valor de pagamento deve ser um número maior ou igual a 0')
        }

        this.valorPagamento = valorPagamento

        if(valorFrete){
            valorFrete = valorFrete.replace(',', '.').trim()
            if(!eNumerico(valorFrete)){
                throw new DataError('Type Error', 400, 'O valor de frete deve ser do tipo númerico')
            }

            valorFrete = parseFloat(valorFrete).toFixed(2)

            if(valorFrete < 0){
                throw new DataError('Validation Error', 400, 'O valor do frete deve ser um número maior ou igual a 0')
            }

            this.valorFrete = valorFrete
        }else{
            this.valorFrete = 0
        }

        if(valorInstalacao){
            valorInstalacao = valorInstalacao.replace(',', '.').trim()
            if(!eNumerico(valorInstalacao)){
                throw new DataError('Type Error', 400, 'O valor da instalacao deve ser do tipo númerico')
            }

            valorInstalacao = parseFloat(valorInstalacao).toFixed(2)

            if(valorInstalacao < 0){
                throw new DataError('Validation Error', 400, 'O valor da instalacao deve ser um número maior ou igual a 0')
            }

            this.valorInstalacao = valorInstalacao
        }else{
            this.valorInstalacao = 0
        }

        this.valorInstalacao = valorInstalacao
        this.id = null
    }
    
    get idCliente(){
        return this.idCliente
    }

    set idCliente(novoId){
        if(!validarId(idCliente.trim())){
            throw new DataError('Invalid ID', 400, 'O id de cliente é inválido')
        }

        this.idCliente = novoId.trim()
    }

    get idStatus(){
        return this.idStatus
    }

    set idStatus(novoId){
        if(!validarId(novoId.trim())){
            throw new DataError('Invalid ID', 400, 'O id de status é inválido')
        }

        this.idStatus = novoId.trim()
    }

    get valorPagamento(){
        return this.valorPagamento
    }

    set valorPagamento(novoValor){
        novoValor = novoValor.replace(',', '.').trim()

        if(!eNumerico(novoValor)){
            throw new DataError('Type Error', 400, 'O valor de pagamento deve ser do tipo númerico')
        }

        novoValor = parseFloat(novoValor).toFixed(2)

        if(novoValor < 0){
            throw new DataError('Validation Error', 400, 'O valor de pagamento deve ser um número maior ou igual a 0')
        }

        this.valorPagamento = novoValor
    }

    get valorFrete(){
        return this.valorFrete
    }

    set valorFrete(novoValor){
        if(novoValor){
            novoValor = novoValor.replace(',', '.').trim()
            if(!eNumerico(novoValor)){
                throw new DataError('Type Error', 400, 'O valor de frete deve ser do tipo númerico')
            }

            novoValor = parseFloat(novoValor).toFixed(2)

            if(novoValor < 0){
                throw new DataError('Validation Error', 400, 'O valor do frete deve ser um número maior ou igual a 0')
            }

            this.valorFrete = novoValor
        }
    }

    get valorInstalacao(){
        return this.valorInstalacao
    }

    set valorInstalacao(novoValor){
        if(novoValor){
            novoValor = novoValor.replace(',', '.').trim()
            if(!eNumerico(novoValor)){
                throw new DataError('Type Error', 400, 'O valor de frete deve ser do tipo númerico')
            }

            novoValor = parseFloat(novoValor).toFixed(2)

            if(novoValor < 0){
                throw new DataError('Validation Error', 400, 'O valor do frete deve ser um número maior ou igual a 0')
            }

            this.valorFrete = novoValor
        }
    }

    async create (){
        try{
            const novoOrcamento = await Orcamento.database.create({
                idCliente: this.idCliente,
                idStatus: this.idStatus,
                valorPagamento: this.valorPagamento,
                valorInstalacao: this.valorInstalacao,
                valorFrete: this.valorFrete
            })

            this.id = novoOrcamento._id

            return novoOrcamento
        }catch(error){
            console.error('Erro ao criar o orçamento no banco')
            throw new DataError('Internal Server Error', 500, 'Erro ao criar o orçamento no banco')
        }
    }

    async update (){
        try{
            const orcamentoAtualizado = await Orcamento.database.findByIdAndUpdate(this.id, {
                idCliente: this.idCliente,
                idStatus: this.idStatus,
                valorPagamento: this.valorPagamento,
                valorFrete: this.valorFrete,
                valorInstalacao: this.valorInstalacao
            })

            if(!orcamentoAtualizado){
                throw new DataError('Invalid ID', 404, 'Orcamento não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao atualizar os dados de orcamento no banco')
    
                throw new DataError('Internal Server Error', 500, 'Erro ao atualizar os dados de orcamento no banco')
            }

            throw error
        }
    }

    async delete (){
        try{
            const orcamentoDeletado = await Orcamento.database.findByIdAndDelete(this.id)

            if(!orcamentoDeletado){
                throw new DataError('Invalid ID', 404, 'Orcamento não encontrado')
            }

            return orcamentoDeletado
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao deletar orcamento: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao deletar orcamento')
            }

            throw error
        }
    }
}

module.exports = Orcamento