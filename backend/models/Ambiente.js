const DataError = require('./DataError')
const database = require('mongoose')

const ambienteSchema = new database.Schema({
    nome: {type: String, required: true, unique: true}
}, {timestamps: true});

class Ambiente{
    static database = database.model('Ambiente', ambienteSchema)

    static async findAll(){
        try{
            return await Ambiente.database.find()
        }catch(error){
            console.error('Erro ao fazer o findAll de Ambiente: ')
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o findAll de Ambiente')
        }
    }

    static async findById(id){
        try{
            const ambiente = Ambiente.database.findById(id)

            if(!ambiente){
                throw new DataError('Invalid ID', 404, 'Ambiente não encontrado')
            }

            return ambiente
        }catch(error){
            console.error('Erro ao encontrar por id ambiente: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao encontrar por id ambiente')
        }
    }

    constructor(nome){
        this.nome = nome
        this.id = null
    }

    get nome(){
        return this.nome
    }

    set nome(nome){
        this.nome = nome
    }

    async create(){
        try{
            const novoAmbiente = await Ambiente.database.create({nome: this.nome})

            this.id = novoAmbiente.id
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