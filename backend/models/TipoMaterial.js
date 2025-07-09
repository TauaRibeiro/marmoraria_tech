const database = require('mongoose')

const tipoMaterialSchema = new database.Schema({
    nome: {type: String, required: true}
}, {timestamps: true});

module.exports = database.model('TipoMaterial', tipoMaterialSchema)