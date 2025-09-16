const database = require('mongoose')
const DataError = require('./DataError')

const tipoMaterialSchema = new database.Schema({
    nome: {type: String, required: true, unique: true}
}, {timestamps: true});

class TipoMaterial{
    static database = database.model('TipoMaterial', tipoMaterialSchema)

    static async findAll(){
        try{
            return await TipoMaterial.database.find()
        }catch(error){
            console.error('Erro ao fazer o find all de tipo material: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de tipo material')
        }
    }

    static async findById(id){
        try{
            const resultado = await TipoMaterial.database.findById(id)

            if(!resultado){
                return null
            }
            
            return new TipoMaterial(resultado.nome, resultado._id, resultado.createdAt, resultado.updatedAt)
        }catch(error){
            console.log('Erro ao fazer o find all de tipo material: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de tipo material')
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
            const novoTipoMaterial = await TipoMaterial.database.create({nome: this.nome})

            this.id = novoTipoMaterial._id
        }catch(error){
            console.error('Erro ao criar um novo tipo material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar um novo tipo material no banco')
        }
    }

    async update(){
        try{
            await TipoMaterial.database.findByIdAndUpdate(this.id, {nome: this.nome})
        }catch(error){
            if(error.code === 11000){
                throw new DataError('Validation Error', 400, 'Já existe um tipo com este nome')
            }
            
            console.error('Erro ao atualizar tipo material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar tipo material no banco')
        }
    }

    async delete(){
        try{
            await TipoMaterial.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar tipo material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar tipo material no banco')
        }
    }
}

module.exports = TipoMaterial