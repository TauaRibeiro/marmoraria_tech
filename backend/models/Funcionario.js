const DataError = require('./DataError')
const database = require('mongoose')

const funcionarioSchema = new database.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
    dataNascimento: {type:Date, required: true},
    telefone: {type:String, requied: true, unique: true},
    email: {type: String, required: true, unique: true},
    senha: {type:String, required: true},
    eADM: {type: Boolean, required: true}
});

class Funcionario{
    static database = database.model('Funcionario', funcionarioSchema)

    static async findAll(){
        try{
            const resultado = await Funcionario.database.find()

            return resultado.map((funcionario) => {
                return new Funcionario(funcionario.nome,
                    funcionario.cpf,
                    funcionario.dataNascimento,
                    funcionario.telefone,
                    funcionario.email,
                    funcionario.senha,
                    funcionario._id,
                    funcionario.createdAt,
                    funcionario.updatedAt,
                    funcionario.eADM
                )
            })
        }catch(error){
            console.error('Erro ao fazer o find all de funcionário: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de funcionário')
        }
    }

    static async findById(id){
        try{
            const funcionario = await Funcionario.database.findById(id)

            if(!funcionario){
                return null
            }

            return new Funcionario(funcionario.nome,
                funcionario.cpf,
                funcionario.dataNascimento,
                funcionario.telefone,
                funcionario.email,
                funcionario.senha,
                funcionario._id,
                funcionario.createdAt,
                funcionario.updatedAt,
                funcionario.eADM
            )
        }catch(error){
            if(error.name !== 'Invalid ID'){
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find por id de funcionário')
            }

            throw error
        }
    }

    constructor(nome, cpf, dataNascimento, telefone, email, senha, eADM, id= null, createdAt= new Date(), updatedAt= new Date()){
        this.nome = nome
        this.cpf = cpf
        this.dataNascimento = dataNascimento
        this.telefone = telefone
        this.email = email
        this.senha = senha
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.eADM = eADM
    }

    async create(){
        try{
            const novoFuncionario = await Funcionario.database.create({
                nome: this.nome,
                cpf: this.cpf,
                dataNascimento: this.dataNascimento,
                telefone: this.telefone,
                email: this.email,
                senha: this.senha,
                eADM: this.eADM
            })

            this.id = novoFuncionario._id
        }catch(error){
            if(error.code === 11000){
                let duplicata = await Funcionario.database.findOne({cpf: this.cpf})

                if(duplicata){
                    throw new DataError('Validation Error', 400, 'Já existe um funcionario com este CPF')
                }

                duplicata = await Funcionario.database.findOne({telefone: this.telefone}) 

                if(duplicata){
                    throw new DataError('Validation Error', 400, 'Já existe um funcionario com este telefone')
                }
                
                duplicata = await Funcionario.database.findOne({email: this.email}) 

                if(duplicata){
                    throw new DataError('Validation Error', 400, 'Já existe um funcionario com este email')
                }
            }
            console.error('Erro ao criar funcionario no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao criar funcionario no banco')
        }
    }

    async update(){
        try{
            await Funcionario.database.findByIdAndUpdate(this.id, {
                nome: this.nome,
                cpf: this.cpf,
                dataNascimento: this.dataNascimento,
                telefone: this.telefone,
                email: this.email,
                senha: this.senha,
                eADM: this.eADM
            })
        }catch(error){
            if(error.code === 11000){
                let duplicata = await Funcionario.database.findOne({cpf: this.cpf})

                if(duplicata &&  duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Já existe um funcionario com este CPF')
                }

                duplicata = await Funcionario.database.findOne({telefone: this.telefone}) 

                if(duplicata &&  duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Já existe um funcionario com este telefone')
                }
                
                duplicata = await Funcionario.database.findOne({email: this.email}) 

                if(duplicata && duplicata._id !== this.id){
                    throw new DataError('Validation Error', 400, 'Já existe um funcionario com este email')
                }
            }
            console.error('Erro ao atualizar funcionario no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar funcionario no banco')
        }
    }

    async delete(){
        try{
            await Funcionario.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar funcionario do banco', error)
        }
    }
}

module.exports = Funcionario