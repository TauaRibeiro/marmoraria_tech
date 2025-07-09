const database = require('mongoose')

const categoriaAcessoSchema = new database.Schema({
    nome: {type: String, required: true}
}, { timestamps: true });

module.exports = database.models('CategoriaAcesso', categoriaAcessoSchema)