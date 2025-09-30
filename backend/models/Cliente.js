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
                return new Cliente(cliente.idEndereco,
                    cliente.nome,
                    cliente.email,
                    cliente.dataNascimento,
                    cliente.telefone,
                    cliente.cpf,
                    cliente.cnpj,
                    cliente._id,
                    cliente.createdAt,
                    cliente.updatedAt
                )
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

            return new Cliente(cliente.idEndereco,
                cliente.nome,
                cliente.email,
                cliente.dataNascimento,
                cliente.telefone,
                cliente.cpf,
                cliente.cnpj,
                cliente._id,
                cliente.createdAt,
                cliente.updatedAt
            )
        }catch(error){
            console.log('Erro fazer o find by id de cliente: ', error)
            throw DataError('Internal Server Error', 500, 'Erro fazer o find by id de cliente')
        }
    }

    static async findManyBy(filtro){
        try{
            const resultado = await Cliente.database.find(filtro)

            return resultado.map((cliente) => {
                return new Cliente(cliente.idEndereco,
                    cliente.nome,
                    cliente.email,
                    cliente.dataNascimento,
                    cliente.telefone,
                    cliente.cpf,
                    cliente.cnpj,
                    cliente._id,
                    cliente.createdAt,
                    cliente.updatedAt
                )
            })
        }catch(error){
            console.error('Erro ao fazer o find all de cliente: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de cliente')
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
            if(error.code === 11000){
                let duplicata = await Cliente.database.findOne({email: this.email})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse email já usado por um cliente')
                }

                duplicata = await Cliente.database.findOne({telefone: this.telefone})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse telefone já usado por um cliente')
                }

                duplicata = await Cliente.database.findOne({cpf: this.cpf})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse CPF já usado por um cliente')
                }

                duplicata = await Cliente.database.findOne({cnpj: this.cnpj})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse CNPJ já usado por um cliente')
                }
            }
            console.error('Erro ao criar cliente no banco: ', error)
            throw new DataError('Internal Server Error', 400, 'Erro ao criar cliente no banco')
        }
    }

    async update(){
        try{
            await Cliente.database.findByIdAndUpdate(this.id, {
                idEndereco: this.idEndereco,
                nome: this.nome,
                email: this.email,
                dataNascimento: this.dataNascimento,
                telefone: this.telefone,
                cpf: this.cpf,
                cnpj: this.cnpj
            })
        }catch(error){
            if(error.code === 11000){
                let duplicata = await Cliente.database.findOne({email: this.email})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse email já usado por um cliente')
                }

                duplicata = await Cliente.database.findOne({telefone: this.telefone})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse telefone já usado por um cliente')
                }

                duplicata = await Cliente.database.findOne({cpf: this.cpf})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse CPF já usado por um cliente')
                }

                duplicata = await Cliente.database.findOne({cnpj: this.cnpj})

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Esse CNPJ já usado por um cliente')
                }
            }
            console.error('Erro ao criar cliente no banco: ', error)
            throw new DataError('Internal Server Error', 400, 'Erro ao criar cliente no banco')
        }
    }

    async delete(){
        try{
            await Cliente.database.findByIdAndDelete(this.id)
        }catch(error){
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar o cliente no banco')
        }
    }
}

module.exports = Cliente