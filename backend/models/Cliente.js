const database = require('mongoose')

const clienteSchema = new database.Schema({
    idEndereco: {
        type: database.Schema.ObjectId,
        ref: 'Endereco',
        required: true,
    },
    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    dataNasciemnto: { type: Date, required: true},
    telefone: { type: String, required: true},
    cpf: {type: String, required: true},
    cnpj: {type: String, required: true}
}, {timestamps: true})

module.exports = database.model('Cliente', clienteSchema)