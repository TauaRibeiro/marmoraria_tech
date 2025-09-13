const DataError = require('./DataError')
const database = require('mongoose')
const eNumerico = require('../utils/eNumerico')

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
            return Endereco.database.find()
        }catch(error){
            console.error('Erro ao fazer o find all de endereço: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all endereço')
        }
    }

    static async findById(id){
        try{
            const endereco = await Endereco.findById(id)

            if(!endereco){
                throw new DataError('Invalid ID', 404, 'Erro ao fazer o find by id de endereco')
            }

            return endereco
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

    get cep(){
        return this.cep
    }

    set cep(novoCep){
        const duplicata = Endereco.database.findOne({cep: novoCep.trim()})

        if(duplicata){
            throw new DataError('Validation Error', 400, 'Já existe um endereço com este CEP')
        }

        this.cep = novoCep
    }

    get cidade(){
        return this.cidade
    }

    set cidade(novaCidade){
        this.cidade = novaCidade
    }

    get rua(){
        return this.rua
    }

    set rua(novaRua){
        this.rua = novaRua
    }

    get numero(){
        return this.numero
    }

    set numero(novoNumero){
        this.numero = novoNumero
    }

    get bairro(){
        return this.bairro
    }

    set bairro(novoBairro){
        this.bairro = novoBairro
    }

    get complemento(){
        return this.complemento
    }

    set complemento(novoComplemento){
        this.complemento = novoComplemento
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