const DataError = require('./DataError')
const database = require('mongoose')
const validarId = require('../utils/validarIdMongoose')

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
            if(!validarId(id)){
                throw new DataError('Invalid ID', 400, 'Id inválido')
            }

            const ambiente = Ambiente.database.findById(id)

            if(!ambiente){
                throw new DataError('Invalid ID', 404, 'Ambiente não encontrado')
            }

            return ambiente
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao encontrar por id ambiente: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao encontrar por id ambiente')
            }
        }
    }

    constructor(nome){
        if(nome.trim().length === 0){
            throw new DataError('Validation Error', 400, 'Nome do inválido')
        }

        this.nome = nome.trim()
        this.id = null
    }

    get nome(){
        return this.nome
    }

    set nome(nome){
        if(nome.trim().length === 0){
            throw new DataError('Validation Error', 400, 'Nome do inválido')
        }

        this.nome = nome.trim()
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
            const ambienteAtualizado = await Ambiente.database.findByIdAndUpdate(this.id, {nome: this.nome})

            if(!ambienteAtualizado){
                throw new DataError('Invalid ID', 404, 'Ambiente não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao atualizar ambiente no banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao atualizar ambiente no banco')
            }

            throw error
        }
    }

    async delete(){
        try{
            const ambienteDeletado = await Ambiente.database.findByIdAndDelete(this.id)
            
            if(!ambienteDeletado){
                throw new DataError('Invalid ID', 404, 'Ambiente não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao deletar ambiente no banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao deletar ambiente no banco')
            }

            throw error
        }
    }
}

module.exports = Ambiente