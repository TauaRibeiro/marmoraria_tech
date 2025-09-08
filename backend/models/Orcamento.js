const database = require('mongoose')

const orcamentoSchema = new database.Schema({
    idCliente: {
        type: database.Schema.ObjectId,
        ref: 'Cliente',
        required: true
    },
    idStatus: {
        type: database.Schema.ObjectId,
        ref: 'Status',
        required: true
    },
    valorPagamento: {type: Number, required: true},
    valorFrete: {type: Number, default: 0},
    valorInstalacao: {type: Number, default: 0}
});

module.exports = database.model('Orcamento', orcamentoSchema)