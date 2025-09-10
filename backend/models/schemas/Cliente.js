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

module.exports = database.model('Cliente', clienteSchema)