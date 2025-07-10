const database = require('mongoose')

const funcionarioSchema = new database.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true},
    dataNascimento: {type:Date, required: true},
    telefone: {type:String, requied: true},
    email: {type: String, required: true},
    senha: {type:String, required: true}
}); 

module.exports = new database.model('Funcionario', funcionarioSchema);