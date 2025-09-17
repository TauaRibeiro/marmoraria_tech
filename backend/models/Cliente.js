const DataError = require('./DataError')
const database = require('mongoose')

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
            const resultado = await Cliente.database.find()

            return resultado.map((cliente) => {
                return {
                    id: cliente._id,
                    idEndereco: cliente.idEndereco,
                    nome: cliente.nome,
                    email: cliente.email,
                    dataNascimento: cliente.dataNascimento,
                    telefone: cliente.telefone,
                    cpf: cliente.cpf,
                    cnpj: cliente.cnpj,
                    createdAt: cliente.createdAt,
                    updatedAt: cliente.updatedAt
                }
            })
        }catch(error){
            console.error('Erro ao fazer o find all de cliente: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de cliente')
        }
    }

    static async findById(id){
        try{
            const cliente = await Cliente.database.findById(id)

            if(!cliente){
                return null
            }

            return {
                id: cliente._id,
                idEndereco: cliente.idEndereco,
                nome: cliente.nome,
                email: cliente.email,
                dataNascimento: cliente.dataNascimento,
                telefone: cliente.telefone,
                cpf: cliente.cpf,
                cnpj: cliente.cnpj,
                createdAt: cliente.createdAt,
                updatedAt: cliente.updatedAt
            }
        }catch(error){
            console.log('Erro fazer o find by id de cliente: ', error)
            throw DataError('Internal Server Error', 500, 'Erro fazer o find by id de cliente')
        }
    }

    constructor(idEndereco, nome, email, dataNascimento, telefone, cpf, cnpj, id= null, createdAt= new Date(), updatedAt= new Date()){
        this.idEndereco = idEndereco,
        this.nome = nome,
        this.email = email,
        this.dataNascimento = dataNascimento,
        this.telefone = telefone,
        this.cpf = cpf,
        this.cnpj = cnpj
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create(){
        try{
            const novoCliente = await Cliente.database.create({
                idEndereco: this.idEndereco,
                nome: this.nome,
                email: this.email,
                dataNascimento: this.dataNascimento,
                telefone: this.telefone,
                cpf: this.cpf,
                cnpj: this.cnpj
            })

            this.id = novoCliente._id
        }catch(error){
            console.error('Erro ao criar cliente no banco: ', error)
            throw new DataError('Internal Server Error', 400, 'Erro ao criar cliente no banco')
        }
    }

    async update(){
        try{
            const clienteAtualizado = await Cliente.database.findByIdAndUpdate(this.id, {
                idEndereco: this.idEndereco,
                nome: this.nome,
                email: this.email,
                dataNascimento: this.dataNascimento,
                telefone: this.telefone,
                cpf: this.cpf,
                cnpj: this.cnpj
            })

            if(!clienteAtualizado){
                throw new DataError('Invalid ID', 404, 'Cliente não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                throw new DataError('Internal Server Error', 500, 'Erro ao atualizar o cliente no banco')
            }

            throw error
        }
    }

    async delete(){
        try{
            const clienteDeletado = await Cliente.database.findByIdAndDelete(this.id)

            if(!clienteDeletado){
                throw new DataError('Invalid ID', 404, 'Cliente não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                throw new DataError('Internal Server Error', 500, 'Erro ao atualizar o cliente no banco')
            }

            throw error
        }
    }
}

module.exports = Cliente