const DataError = require('./DataError')
const database = require('mongoose')

const funcionarioSchema = new database.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
    dataNascimento: {type:Date, required: true},
    telefone: {type:String, requied: true, unique: true},
    email: {type: String, required: true, unique: true},
    senha: {type:String, required: true}
});

class Funcionario{
    static database = database.model('Funcionario', funcionarioSchema)

    static async findAll(){
        try{
            const resultado = await Funcionario.database.find()

            return resultado.map((funcionario) => {
                return {
                    id: funcionario._id,
                    nome: funcionario.nome,
                    cpf: funcionario.cpf,
                    dataNascimento: funcionario.dataNascimento,
                    telefone: funcionario.telefone,
                    email: funcionario.email,
                    senha: funcionario.senha
                }
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

            return {
                id: funcionario._id,
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                dataNascimento: funcionario.dataNascimento,
                telefone: funcionario.telefone,
                email: funcionario.email,
                senha: funcionario.senha
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find por id de funcionário')
            }

            throw error
        }
    }

    constructor(nome, cpf, dataNascimento, telefone, email, senha, id= null, createdAt= new Date(), updatedAt= new Date()){
        this.nome = nome
        this.cpf = cpf
        this.dataNascimento = dataNascimento
        this.telefone = telefone
        this.email = email
        this.senha = senha
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create(){
        try{
            const novoFuncionario = await Funcionario.database.create({
                nome: this.nome,
                cpf: this.cpf,
                dataNascimento: this.dataNascimento,
                telefone: this.telefone,
                email: this.email,
                senha: this.senha
            })

            this.id = novoFuncionario._id
        }catch(error){
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
                senha: this.senha
            })
        }catch(error){
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