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
    valorFrete: {type: Number, default: 0},
    valorInstalacao: {type: Number, default: 0}
});

class Orcamento{
    static database = database.model('Orcamento', orcamentoSchema)

    static async findById(id){
        try{
            const orcamento = await Orcamento.database.findById(id)
    
            if(!orcamento){
                return null
            }
    
            return new Orcamento(orcamento.idCliente, 
                orcamento.idStatus, 
                orcamento.valorFrete, 
                orcamento.valorInstalacao,
                orcamento._id,
                orcamento.createdAt,
                orcamento.updatedAt
            )
        }catch(error){
            console.error(error)
            throw new DataError('Internal Server Error', 500, 'Erro interno do servidor')
        }
    }

    static async findAll(){
        try{
            const resultado = await Orcamento.database.find()

            return resultado.map((orcamento) => {
                return new Orcamento(orcamento.idCliente, 
                    orcamento.idStatus, 
                    orcamento.valorFrete, 
                    orcamento.valorInstalacao,
                    orcamento._id,
                    orcamento.createdAt,
                    orcamento.updatedAt
                )
            })
        }catch(error){
            console.error(error)
            throw new DataError('Internal Server Error', 500, 'Erro interno do servidor')
        }
    }

    static async findManyBy(filtro){
        try{
            const resultado = await Orcamento.database.find(filtro)

            return resultado.map((orcamento) => {
                return new Orcamento(orcamento.idCliente, 
                    orcamento.idStatus, 
                    orcamento.valorFrete, 
                    orcamento.valorInstalacao,
                    orcamento._id,
                    orcamento.createdAt,
                    orcamento.updatedAt
                )
            })
        }catch(error){
            console.error('Erro ao fazer o find many by de orçamento: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de orçamento')
        }
    }

    static async updateManyBy(filtro, data){
        try{
            await Orcamento.database.updateMany(filtro, data)
        }catch(error){
            console.error('Erro ao fazer o update many by de orcamento: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o update many by de orcamento')
        }
    }

    static async deleteManyBy(filtro){
        try{
            const resultado = await Orcamento.database.deleteMany(filtro)
    
            if(resultado.deletedCount === 0){
                throw new DataError('Search Error', 404, 'Nenhum orçamento encontrado')
            }
        }catch(error){
            if(error.name === 'Search Error'){
                console.error('Erro ao fazer o find many by de orçamento: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de orçamento')
            }

            throw error
        }
    }

    constructor (idCliente, idStatus, valorFrete, valorInstalacao, id= null, createdAt= new Date(), updatedAt= new Date()){
        this.idCliente = idCliente
        this.idStatus = idStatus
        this.valorInstalacao = (valorInstalacao) ? valorInstalacao : 0
        this.valorFrete = (valorFrete) ? valorFrete : 0
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
    
    async create (){
        try{
            const novoOrcamento = await Orcamento.database.create({
                idCliente: this.idCliente,
                idStatus: this.idStatus,
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