const database = require('mongoose')

const ambienteSchema = new database.Schema({
    nome: {type: String, required: true}
}, {timestamps: true});

module.exports = database.model('Ambiente', ambienteSchema)