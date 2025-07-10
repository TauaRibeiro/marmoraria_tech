const database = require('mongoose')

const precoMaterialSchema = new database.Schema({
    idMaterial: {
        type: database.Schema.ObjectId,
        ref: 'Material',
        required: true,
    },
    valorMaterial: {type: Number, required: true},
    dataAplicacao: {type: Date, default: database.now()},
}, {timestamps: true});

module.exports = database.model('PrecoMaterial', precoMaterialSchema)