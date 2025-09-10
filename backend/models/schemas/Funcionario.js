const database = require('mongoose')

const funcionarioSchema = new database.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
    dataNascimento: {type:Date, required: true},
    telefone: {type:String, requied: true, unique: true},
    email: {type: String, required: true, unique: true},
    senha: {type:String, required: true}
}); 

module.exports = database.model('Funcionario', funcionarioSchema);