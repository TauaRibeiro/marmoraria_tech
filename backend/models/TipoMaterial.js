const database = require('mongoose')
const DataError = require('./DataError')

const tipoMaterialSchema = new database.Schema({
    nome: {type: String, required: true, unique: true}
}, {timestamps: true});

class TipoMaterial{
    static database = database.model('Status', statusSchema)

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
            const resultado = TipoMaterial.database.findById(id)

            if(!resultado){
                throw new DataError('Invalid Id', 404, 'Tipo material não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid Id'){
                console.log('Erro ao fazer o find all de tipo material: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de tipo material')
            }

            throw error
        }
    }

    constructor(nome){
        this.nome = nome
        this.id = null
    }

    get nome(){
        return this.nome
    }

    set nome(novoNome){
        this.nome = novoNome
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