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
        this.id = null
    }

    get idEndereco(){
        return this.idEndereco
    }

    set idEndereco(idEndereco){
        this.idEndereco = idEndereco
    }

    get nome(){
        return this.nome
    }

    set nome(novoNome){
        this.nome = novoNome
    }

    get dataNascimento(){
        return this.dataNascimento
    }

    set dataNascimento(novaData){
        this.novaData = novaData
    }

    get telefone(){
        return this.telefone
    }

    set telefone(novoTelefone){
        this.telefone = novoTelefone
    }

    get cpf(){
        return this.cpf
    }

    set cpf(novoCpf){
        if(novoCpf){
            this.cpf
        }

        if(this.cnpj === null){
            throw new DataError('Validation Error', 400, 'Não é possível setar o CPF como nulo quando CNPJ é nulo')
        }

        this.cpf = null
    }

    get cnpj(){
        return this.cnpj
    }

    set cnpj(novoCnpj){
        if(novoCnpj){
            this.cnpj = novoCnpj
        }

        if(this.cpf === null){
            throw new DataError('Validation Error', 400, 'Não é possível setar CNPJ como nulo quando CPF é nulo')
        }

        this.cnpj = null
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