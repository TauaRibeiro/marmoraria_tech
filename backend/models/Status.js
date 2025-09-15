const DataError = require('./DataError')
const database = require('mongoose')

const statusSchema = new database.Schema({
    nome: {type: String, required: true, unique: true}
}, { timestamps: true});

class Status{
    static database = database.model('Status', statusSchema)

    static async findAll(){
        try{
            const resultadoBanco = await Status.database.find()

            return resultadoBanco.map((status) => {
                return new Status(status.nome, status.createdAt, status.updatedAt)
            })
        }catch(error){
            console.error('Erro ao fazer o find all de status: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de status')
        }
    }

    static async findById(id){
        try{
            const resultado = await Status.database.findById(id)

            if(!resultado){
                return null
            }

            return new Status(nome, resultado.createdAt, resultado.updatedAt)
        }catch(error){
            if(error.name !== 'Invalid Id'){
                console.log('Erro ao fazer o find all de status: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de status')
            }

            throw error
        }
    }

    constructor(nome, id= null, createdAt= new Date(), updatedAt= new Date() ){
        this.nome = nome
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    get nome(){
        return this.nome
    }

    set nome(novoNome){
        this.nome = novoNome
    }

    async create(){
        try{
            const novoStatus = await Status.database.create({nome: this.nome})

            this.id = novoStatus._id
        }catch(error){
            console.error('Erro ao criar um novo status no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar um novo status no banco')
        }
    }

    async update(){
        try{
            await Status.database.findByIdAndUpdate(this.id, {nome: this.nome})
            this.updatedAt = new Date()
        }catch(error){
            console.error('Erro ao atualizar status no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar status no banco')
        }
    }

    async delete(){
        try{
            await Status.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar status no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar status no banco')
        }
    }
}

module.exports = Status