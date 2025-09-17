const DataError = require('./DataError')
const database = require('mongoose')

const enderecoSchema = new database.Schema({
    cep: {type: String, required: true, unique: true},
    cidade: {type: String, required: true},
    rua: {type: String, required: true},
    numero: {type: Number, required: true},
    bairro: {type: String, required: true},
    complemento: {type: String}
}, {timestamps: true});

class Endereco{
    static database = database.model('Endereco', enderecoSchema)

    static async findAll(){
        try{
            const resultado = await Endereco.database.find()

            return resultado.map((endereco) => {
                return {
                    id: endereco._id,
                    cep: endereco.cep,
                    cidade: endereco.cidade,
                    rua: endereco.rua,
                    numero: endereco.numero,
                    bairro: endereco.bairro,
                    complemento: endereco.complemento,
                    createdAt: endereco.createdAt,
                    updatedAt: endereco.updatedAt
                }
            })
        }catch(error){
            console.error('Erro ao fazer o find all de endereço: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all endereço')
        }
    }

    static async findById(id){
        try{
            const endereco = await Endereco.findById(id)

            if(!endereco){
                return null
            }

            return {
                id: endereco._id,
                cep: endereco.cep,
                cidade: endereco.cidade,
                rua: endereco.rua,
                numero: endereco.numero,
                bairro: endereco.bairro,
                complemento: endereco.complemento,
                createdAt: endereco.createdAt,
                updatedAt: endereco.updatedAt
            }
        }catch(error){}
    }

    constructor(cep, cidade, rua, numero, bairro, complemento){
        this.cep = cep
        this.cidade = cidade
        this.rua = rua
        this.numero = numero
        this.bairro = bairro
        this.complemento = complemento
        this.id = null
    }

    async create(){
        try{
            const novoEndereco = await Endereco.database.create({
                cep: this.cep,
                cidade: this.cidade,
                rua: this.rua,
                numero: this.numero,
                bairro: this.bairro,
                complemento: this.complemento
            })

            this.id = novoEndereco._id
        }catch(error){
            if(error.code === 11000){
                throw new DataError('Validation Error', 400, 'Já existe um endereço com este CEP')
            }

            console.error('Erro ao criar endereço no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar endereço no banco')
        }
    }

    async update(){
        try{
            await Endereco.database.findByIdAndUpdate(this.id, {
                cep: this.cep,
                cidade: this.cidade,
                rua: this.rua,
                numero: this.numero,
                bairro: this.bairro,
                complemento: this.complemento
            })
        }catch(error){
            if(error.code === 11000){
                throw new DataError('Validation Error', 400, 'Já existe um endereço com este CEP')
            }

            console.error('Erro ao atualizar o endereço no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar o endereço no banco')
        }
    }

    async delete(){
        try{
            await Endereco.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar endereço no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar endereço no banco')
        }
    }
}

module.exports = Endereco