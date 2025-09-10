const database = require('mongoose')

const materialSchema = new database.Schema({
    idTipo: {
        type: database.Schema.ObjectId,
        ref: 'TipoMaterial',
        required: true,
    },
    idStatus: {
        type: database.Schema.ObjectId,
        ref: 'Status',
        required: true
    },
    nome: {type: String, required: true},
    estoqueMin: {type: Number, required: true},
    estoqueMax: {type: Number, required: true},
    estoque: {type: Number, required: true},
}, {timestamps: true});

module.exports = database.model('Material', materialSchema)