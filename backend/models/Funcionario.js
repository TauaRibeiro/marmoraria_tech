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
            return await Funcionario.database.find()
        }catch(error){
            console.error('Erro ao fazer o find all de funcionário: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de funcionário')
        }
    }

    static async findById(id){
        try{
            const funcionario = await Funcionario.database.findById(id)

            if(!funcionario){
                throw new DataError('Invalid ID', 404, 'Funcionário não encontrado')
            }

            return funcionario
        }catch(error){
            if(error.name !== 'Invalid ID'){
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find por id de funcionário')
            }

            throw error
        }
    }

    constructor(nome, cpf, dataNascimento, telefone, email, senha){
        this.nome = nome
        this.cpf = cpf
        this.dataNascimento = dataNascimento
        this.telefone = telefone
        this.email = email
        this.senha = senha
        this.id = null
    }

    get nome(){
        return this.nome
    }

    set nome(novoNome){
        this.nome = novoNome
    }

    get cpf(){
        return this.cpf
    }

    set cpf(novoCpf){
        this.cpf = novoCpf
    }

    get dataNascimento(){
        return this.dataNascimento
    }

    set dataNascimento(novaData){
        this.dataNascimento = novaData
    }

    get telefone(){
        return this.telefone
    }

    set telefone(novoTelefone){
        this.telefone = novoTelefone
    }

    get email(){
        return this.email
    }

    set email(novoEmail){
        this.email = novoEmail
    }

    get senha(){
        return this.senha
    }

    set senha(novaSenha){
        this.senha = novaSenha
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
            throw new DataError('Internal Error', 500, 'Erro ao criar funcionario no banco')
        }
    }
}

module.exports = Funcionario