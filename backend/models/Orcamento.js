const DataError = require('./DataError')
const database = require('mongoose')

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
            const orcamento = await Orcamento.database.findById(id.trim())
    
            if(!orcamento){
                throw new DataError('Invalid ID', 400, 'Orcamento não encontrado')
            }
    
            return orcamento
        }catch(error){
            console.error(error)
            throw new DataError('Internal Server Error', 500, 'Erro interno do servidor')
        }
    }

    static async getAllOrcamentos(){
        try{
            return await Orcamento.database.find()
        }catch(error){
            console.error(error)
            throw new DataError('Internal Server Error', 500, 'Erro interno do servidor')
        }
    }

    static async findManyBy(filtro){
        try{
            const resultado = await Orcamento.database.find(filtro)

            if(resultado.length === 0){
                throw new DataError('Search Error', 404, 'Nenhum orçamento encontrado')
            }

            return resultado
        }catch(error){
            if(error.name === 'Search Error'){
                console.error('Erro ao fazer o find many by de orçamento: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de orçamento')
            }

            throw error
        }
    }

    static async deleteManyBy(filtro){
        try{
            const resultado = await Orcamento.database.find(filtro)
    
            if(resultado.length === 0){
                throw new DataError('Search Error', 404, 'Nenhum orçamento encontrado')
            }
    
            resultado.map(async (orcamento) => await orcamento.deleteOne())
        }catch(error){
            if(error.name === 'Search Error'){
                console.error('Erro ao fazer o find many by de orçamento: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de orçamento')
            }

            throw error
        }
    }
    
    constructor (idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao){
        this.idCliente = idCliente
        this.idStatus = idStatus
        this.valorPagamento = valorPagamento
        this.valorInstalacao = (valorInstalacao) ? valorInstalacao : 0
        this.valorFrete = (valorFrete) ? valorFrete : 0
        this.id = null
    }
    
    get idCliente(){
        return this.idCliente
    }

    set idCliente(novoId){
        this.idCliente = novoId
    }

    get idStatus(){
        return this.idStatus
    }

    set idStatus(novoId){
        this.idStatus = novoId
    }

    get valorPagamento(){
        return this.valorPagamento
    }

    set valorPagamento(novoValor){
        this.valorPagamento = novoValor
    }

    get valorFrete(){
        return this.valorFrete
    }

    set valorFrete(novoValor){
        if(novoValor){
            this.valorFrete = novoValor
        }

        this.valorFrete = 0
    }

    get valorInstalacao(){
        return this.valorInstalacao
    }

    set valorInstalacao(novoValor){
        if(novoValor){
            this.valorFrete = novoValor
        }

        this.valorInstalacao = 0
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
        }catch(error){
            console.error('Erro ao criar o orçamento no banco')
            throw new DataError('Internal Server Error', 500, 'Erro ao criar o orçamento no banco')
        }
    }

    async update (){
        try{
            await Orcamento.database.findByIdAndUpdate(this.id, {
                idCliente: this.idCliente,
                idStatus: this.idStatus,
                valorPagamento: this.valorPagamento,
                valorFrete: this.valorFrete,
                valorInstalacao: this.valorInstalacao
            })
        }catch(error){
            console.error('Erro ao atualizar os dados de orcamento no banco')
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar os dados de orcamento no banco')
        }
    }

    async delete (){
        try{
            await Orcamento.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar orcamento: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar orcamento')
        }
    }
}

module.exports = Orcamento