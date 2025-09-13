const DataError = require('./DataError')
const database = require('mongoose')
const validarId = require('../utils/validarIdMongoose')

const clienteSchema = new database.Schema({
    idEndereco: {
        type: database.Schema.ObjectId,
        ref: 'Endereco',
        required: true,
    },
    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    dataNascimento: { type: Date, required: true},
    telefone: { type: String, required: true, unique: true},
    cpf: {type: String,  unique: true},
    cnpj: {type: String, unique: true}
}, {timestamps: true})

class Cliente{
    static database = database.model('Cliente', clienteSchema)

    static async findAll(){
        try{
            return await Cliente.database.find()
        }catch(error){
            console.error('Erro ao fazer o find all de cliente: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de cliente')
        }
    }

    static async findById(id){
        try{
            const cliente = await Cliente.database.findById(id)

            if(!cliente){
                throw DataError('Invalid ID', 404, 'Cliente não encontrado')
            }

            return cliente
        }catch(error){
            console.log('Erro fazer o find by id de cliente: ', error)
            throw DataError('Internal Server Error', 500, 'Erro fazer o find by id de cliente')
        }
    }

    constructor(idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj){
        this.idEndereco = idEndereco,
        this.nome = nome,
        this.email = email,
        this.dataNascimento = dataNascimento,
        this.telefone = telefone,
        this.cpf = cpf,
        this.cnpj = cnpj
    }

    get idEndereco(){
        return this.idEndereco
    }

    set idEndereco(idEndereco){
        if(!validarId(idEndereco)){
            throw new DataError('Invalid ID', 400, 'Id de endereco inválido')
        }

        this.idEndereco = idEndereco
    }
}

module.exports = database.model('Cliente', clienteSchema)