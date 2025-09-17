const DataError = require('./DataError')
const database = require('mongoose')

const ambienteSchema = new database.Schema({
    nome: {type: String, required: true, unique: true}
}, {timestamps: true});

class Ambiente{
    static database = database.model('Ambiente', ambienteSchema)

    static async findAll(){
        try{
            const resultado = await Ambiente.database.find() 
            return resultado.map((ambiente) => {
                return new Ambiente(ambiente.nome, ambiente._id, ambiente.createdAt, ambiente.updatedAt)
            })
        }catch(error){
            console.error('Erro ao fazer o findAll de Ambiente: ')
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o findAll de Ambiente')
        }
    }

    static async findById(id){
        try{
            const ambiente = Ambiente.database.findById(id)

            if(!ambiente){
                return null
            }

            return new Ambiente(ambiente.nome, ambiente._id, ambiente.createdAt, ambiente.updatedAt)
        }catch(error){
            console.error('Erro ao encontrar por id ambiente: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao encontrar por id ambiente')
        }
    }

    constructor(nome, id= null, createdAt= new Date(), updatedAt= new Date()){
        this.nome = nome
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create(){
        try{
            const novoAmbiente = await Ambiente.database.create({nome: this.nome})

            this.id = novoAmbiente._id
        }catch(error){
            console.error('Erro ao criar ambiente no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar ambiente no banco')
        }
    }

    async update(){
        try{
            await Ambiente.database.findByIdAndUpdate(this.id, {nome: this.nome})
        }catch(error){
            console.error('Erro ao atualizar ambiente no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar ambiente no banco')
        }
    }

    async delete(){
        try{
            await Ambiente.database.findByIdAndDelete(this.id)
            
        }catch(error){
            console.error('Erro ao deletar ambiente no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar ambiente no banco')
        }
    }
}

module.exports = Ambiente