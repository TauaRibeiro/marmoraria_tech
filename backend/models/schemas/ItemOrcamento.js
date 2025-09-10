const database = require('mongoose')

const itemOrcamentoSchema = new database.Schema({
    idOrcamento: {
        type: database.Schema.ObjectId,
        ref: 'Orcamento',
        required: true
    },
    idAmbiente: {
        type: database.Schema.ObjectId,
        ref: 'Ambiente',
        required: true
    },
    idMaterial: {
        type: database.Schema.ObjectId,
        ref: 'Material',
        required: true,
    },
    idPreco: {
        type: database.Schema.ObjectId,
        ref: 'PrecoMaterial',
        required: true,
    },
    quantidadeItem: {type:Number, required: true},
    comprimentoItem: {type:Number, required: true},
    larguraItem: {type: Number, required: true},
});

module.exports = database.model('ItemOrcamento', itemOrcamentoSchema)