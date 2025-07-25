const database = require('mongoose')

const enderecoSchema = new database.Schema({
    idStatus: {
        type: database.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    cep: {type: String, required: true, unique: true},
    cidade: {type: String, required: true},
    rua: {type: String, required: true},
    numero: {type: Number, required: true},
    bairro: {type: String, required: true},
    complemento: {type: String}
}, {timestamps: true});

module.exports = database.model('Endereco', enderecoSchema)