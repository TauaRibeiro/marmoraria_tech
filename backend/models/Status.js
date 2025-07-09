const { default: mongoose } = require('mongoose')
const database = require('mongoose')

const statusSchema = new database.Schema({
    nome: {type: String, required: true}
}, { timestamps: true});

module.exports = mongoose.model('Status', statusSchema)