const DataError = require('./DataError')
const database = require('mongoose')

const materialSchema = new database.Schema({
    idTipo: {
        type: database.Schema.ObjectId,
        ref: 'TipoMaterial',
        required: true,
    },
    idStatus: {
        type: database.Schema.ObjectId,
        ref: 'Status',
        required: true
    },
    nome: {type: String, required: true},
    estoqueMin: {type: Number, required: true},
    estoqueMax: {type: Number, required: true},
    estoque: {type: Number, required: true},
}, {timestamps: true});

class Material{
    static database = database.model('Material', materialSchema)

    static async findAll(){
        try{
            return await Material.database.find()
        }catch(error){
            console.error('Erro ao fazer o find all de material')
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de material')
        }
    }

    static async findById(id){
        try{
            const resultado = await Material.database.findById(id)

            if(!resultado){
                throw new DataError('Invalid Id', 404, 'Material não encontrado')
            }

            return resultado
        }catch(error){
            if(error.name !== 'Invalid Id'){
                console.error('Internal Server Error', 500, 'Erro ao fazer o find by id de material')
            }

            throw error
        }
    }

    static async updateManyBy(filtro, data){
        try{
            const resultado = await Material.database.updateMany(filtro, data)

            if(resultado.matchedCount === 0){
                throw new DataError('Search Error', 404, 'Nenhum material foi encontrado')
            }
        }catch(error){
            if(error.name !== 'Serach Error'){
                console.error('Internal Server Error', 500, 'Erro ao fazer o find by id de material')
            }

            throw error
        }
    }

    constructor(idTipo, idStatus, nome, estoqueMin, estoqueMax, estoque){
        this.idTipo = idTipo,
        this.idStatus = idStatus,
        this.nome = nome
        this.estoqueMin = estoqueMin,
        this.estoqueMax = estoqueMax,
        this.estoque = estoque
        this.id = null
    }

    get idTipo(){
        return this.idTipo
    }

    set idTipo(novoId){
        this.idTipo = novoId
    }

    get idStatus(){
        return this.idStatus
    }

    set idStatus(novoId){
        this.idStatus = novoId
    }

    get nome(){
        return this.nome
    }

    set nome(novoNome){
        this.nome = novoNome
    }

    get estoqueMin(){
        return this.estoqueMin
    }

    get estoqueMax(){
        return this.estoqueMax
    }

    get estoque(){
        return this.estoque
    }

    set estoque(novoEstoque){
        this.estoque = novoEstoque
    }

    async setStoqueLimit(novoMin, novoMax){
        if(novoMin > novoMax){
            throw new DataError('Validation Error', 400, 'O estoque mínimo não deve ser maior que o estoque máximo')
        }

        this.estoqueMin = novoMin
        this.estoqueMax = novoMax
    }

    async create(){
        try{
            const novoMaterial = await Material.database.create({
                idTipo: this.idTipo,
                idStatus: this.idStatus,
                nome: this.nome,
                estoqueMin: this.estoqueMin,
                estoqueMax: this.estoqueMax,
                estoque: this.estoque
            })

            this.id = novoMaterial._id
        }catch(error){
            console.error('Erro ao criar material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar material no banco')
        }
    }

    async update(){
        try{
            await Material.database.findByIdAndUpdate(this.id, {
                idTipo: this.idTipo,
                idStatus: this.idStatus,
                nome: this.nome,
                estoqueMin: this.estoqueMin,
                estoqueMax: this.estoqueMax,
                estoque: this.estoque
            })
        }catch(error){
            console.error('Erro ao criar material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar material no banco')
        }
    }

    async delete(){
        try{
            await Material.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao criar material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar material no banco')
        }
    }
}

module.exports = Material