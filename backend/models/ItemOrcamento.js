const DataError = require('./DataError')
const database = require('mongoose')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')

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

class ItemOrcamento{
    static database = database.model('ItemOrcamento', itemOrcamentoSchema)

    constructor(idOrcamento, idAmbiente, idMaterial, idPreco, quantidadeItem, comprimentoItem, larguraItem){
        if(!validarId(idOrcamento.trim())){
            throw new DataError('Invalid ID', 400, 'Id de orcamento inválido')
        }

        this.idOrcamento = idOrcamento.trim()

        if(!validarId(idAmbiente.trim())){
            throw new DataError('Invalid ID', 400, 'Id de ambiente inválido')
        }

        this.idAmbiente = idAmbiente.trim()

        if(!validarId(idMaterial.trim())){
            throw new DataError('Invalid ID', 400, 'Id de material inválido')
        }

        this.idMaterial = idMaterial.trim()

        if(!validarId(idPreco.trim())){
            throw new DataError('Invalid ID', 400, 'Id do preco do material é inválido')
        }

        this.idPreco = idPreco.trim()

        quantidadeItem = quantidadeItem.trim()

        if(!eNumerico(quantidadeItem)){
            throw new DataError('Type Error', 400, 'A quantidade do item deve ser do tipo númerico')
        }

        quantidadeItem = parseInt(quantidadeItem)

        if(quantidadeItem <= 0){
            throw new DataError('Validation Error', 400, 'A quantidade do item deve ser maior do que zero')
        }

        this.quantidadeItem = quantidadeItem

        comprimentoItem = comprimentoItem.replace(',', '.').trim()

        if(!eNumerico(comprimentoItem)){
            throw new DataError('Type Error', 400, 'O comprimento deve ser do tipo numérico')
        }

        comprimentoItem = parseFloat(comprimentoItem).toFixed(2)

        if(comprimentoItem <= 0){
            throw new DataError('Validation Error', 400, 'O comprimento do item deve ser maior do que zero')
        }

        this.comprimentoItem = comprimentoItem

        larguraItem = larguraItem.replace(',', '.').trim()

        if(!eNumerico(larguraItem)){
            throw new DataError('Type Error', 400, 'A largura do item deve ser do tipo numérico')
        }

        larguraItem = parseFloat(larguraItem).toFixed(2)

        if(larguraItem <= 0){
            throw new DataError('Validation Error', 400, 'A largura do item deve ser maior do que zero')
        }

        this.larguraItem = larguraItem

        this.id = null
    }

    static async findAll(){
        try{
            return await ItemOrcamento.database.find()
        }catch(error){
            console.error('Erro ao fazr o find all de Item Orcamento: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazr o find all de Item Orcamento')
        }
    }

    static async findById(id){
        try{
            if(!validarId(id.trim())){
                throw new DataError('Invalid ID', 400, 'Id inválido do item')
            }

            const item = await ItemOrcamento.database.findById(id.trim())

            if(!item){
                throw new DataError('Invalid ID', 404, 'Item não encontrado')
            }

            return item
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao fazer o find por id de item de orcamento no banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find por id de item de orcamento no banco')
            }

            throw error
        }
    }

    get idOrcamento(){
        return this.idOrcamento
    }

    set idOrcamento(novoId){
        if(!validarId(novoId.trim())){
            throw new DataError('Invalid ID', 400, 'Id de orcamento inválido')
        }

        this.idOrcamento = novoId.trim()

    }

    get idAmbiente(){
        return this.idAmbiente
    }

    set idAmbiente(novoId){
        if(!validarId(novoId.trim())){
            throw new DataError('Invalid ID', 400, 'Id de ambiente inválido')
        }

        this.idAmbiente = novoId.trim()
    }

    get idMaterial(){
        return this.idMaterial
    }

    set idMaterial(novoId){
        if(!validarId(novoId.trim())){
            throw new DataError('Invalid ID', 400, 'Id de material inválido')
        }

        this.idMaterial = novoId.trim()
    }

    get idPreco(){
        return this.idPreco
    }

    set idPreco(novoId){
        if(!validarId(novoId.trim())){
            throw new DataError('Invalid ID', 400, 'Id do preco do material é inválido')
        }

        this.idPreco = novoId.trim()
    }

    get quantidadeItem(){
        return this.quantidadeItem
    }

    set quantidadeItem(quantidade){
        quantidade = quantidade.trim()

        if(!eNumerico(quantidade)){
            throw new DataError('Type Error', 400, 'A quantidade do item deve ser do tipo númerico')
        }

        quantidade = parseInt(quantidade)

        if(quantidade <= 0){
            throw new DataError('Validation Error', 400, 'A quantidade do item deve ser maior do que zero')
        }

        this.quantidadeItem = quantidade
    }

    get comprimentoItem(){
        return this.comprimentoItem
    }

    set comprimentoItem(comprimento){
        comprimento = comprimento.replace(',', '.').trim()

        if(!eNumerico(comprimento)){
            throw new DataError('Type Error', 400, 'O comprimento deve ser do tipo numérico')
        }

        comprimento = parseFloat(comprimento).toFixed(2)

        if(comprimento <= 0){
            throw new DataError('Validation Error', 400, 'O comprimento do item deve ser maior do que zero')
        }

        this.comprimentoItem = comprimento
    }

    get larguraItem(){
        return this.larguraItem
    }

    set larguraItem(largura){
        largura = largura.replace(',', '.').trim()

        if(!eNumerico(largura)){
            throw new DataError('Type Error', 400, 'A largura do item deve ser do tipo numérico')
        }

        largura = parseFloat(largura).toFixed(2)

        if(largura <= 0){
            throw new DataError('Validation Error', 400, 'A largura do item deve ser maior do que zero')
        }

        this.larguraItem = largura
    }

    async create(){
        try{
            const novoItem = await ItemOrcamento.database.create({
                idOrcamento: this.idOrcamento,
                idAmbiente: this.idAmbiente,
                idMaterial: this.idMaterial,
                idPreco: this.idPreco,
                quantidadeItem: this.quantidadeItem,
                comprimentoItem: this.comprimentoItem,
                larguraItem: this.larguraItem
            })

            this.id = novoItem._id  
        }catch(error){
            console.error('Erro ao criar o novo item de orcamento no banco: ', error)
            throw new Error('Internal Server Error', 500, 'Erro ao criar o novo item de orcamento no banco')
        }
    }

    async update(){
        try{
            const orcamentoAtualizado = await ItemOrcamento.database.findByIdAndUpdate(this.id, {
                idOrcamento: this.idOrcamento,
                idAmbiente: this.idAmbiente,
                idMaterial: this.idMaterial,
                idPreco: this.idPreco,
                quantidadeItem: this.quantidadeItem,
                comprimentoItem: this.comprimentoItem,
                larguraItem: this.larguraItem
            })

            if(!orcamentoAtualizado){
                throw new DataError('Invalid ID', 400, 'Item de orcamento não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao atualizar item de orcamento no banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao atualizar item de orcamento no banco')
            }

            throw error
        }
    }

    async delete(){
        try{
            const itemDeletado = ItemOrcamento.database.findByIdAndDelete(this.id)

            if(!itemDeletado){
                throw new DataError('Invalid ID', 404, 'Item não encontrado')
            }
        }catch(error){
            if(error.name !== 'Invalid ID'){
                console.error('Erro ao deletar item de orcamento do banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao deletar item de orcamento do banco')
            }

            throw error
        }
    }
}

module.exports = ItemOrcamento