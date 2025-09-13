const DataError = require('./DataError')
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

class ItemOrcamento{
    static database = database.model('ItemOrcamento', itemOrcamentoSchema)
 
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
            const item = await ItemOrcamento.database.findById(id.trim())
            
            if(!item){
                throw new DataError('Invalid ID', 404, 'Item não encontrado')
            }
            
            return item
        }catch(error){
            console.error('Erro ao fazer o find por id de item de orcamento no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find por id de item de orcamento no banco')
        }
    }

    static async updateManyBy(filtro, data){
        try{
            const resultado = await ItemOrcamento.database.updateMany(filtro, data)

            if(resultado.matchedCount === 0){
                throw new DataError('Search Error', 404, 'Itens de orçamento não encontrados')
            }
        }catch(error){
            if(error.name !== 'Search Error'){
                console.error('Erro ao atualizar vários itens no banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao atualizar vários itens no banco')
            }

            throw error
        }
    }

    static async deleteManyBy(filtro){
        try{
            const resultado = await ItemOrcamento.database.deleteMany(filtro)

            if(resultado.deletedCount === 0){
                throw new DataError('Search Error', 404, 'Nenhum item encontrado')
            }
        }catch(error){
            if(error.name !== 'Search Error'){
                console.error('Erro ao deletar vários itens no banco: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao deletar vários itens no banco')
            }

            throw error
        }
    }

    constructor(idOrcamento, idAmbiente, idMaterial, idPreco, quantidadeItem, comprimentoItem, larguraItem){
        this.idOrcamento = idOrcamento
        this.idAmbiente = idAmbiente
        this.idMaterial = idMaterial
        this.idPreco = idPreco
        this.quantidadeItem = quantidadeItem
        this.comprimentoItem = comprimentoItem
        this.larguraItem = larguraItem
        this.id = null
    }
    
    get idOrcamento(){
        return this.idOrcamento
    }

    set idOrcamento(novoId){
        this.idOrcamento = novoId

    }

    get idAmbiente(){
        return this.idAmbiente
    }

    set idAmbiente(novoId){
        this.idAmbiente = novoId
    }

    get idMaterial(){
        return this.idMaterial
    }

    set idMaterial(novoId){
        this.idMaterial = novoId
    }

    get idPreco(){
        return this.idPreco
    }

    set idPreco(novoId){
        this.idPreco = novoId
    }

    get quantidadeItem(){
        return this.quantidadeItem
    }

    set quantidadeItem(quantidade){
        this.quantidadeItem = quantidade
    }

    get comprimentoItem(){
        return this.comprimentoItem
    }

    set comprimentoItem(comprimento){
        this.comprimentoItem = comprimento
    }

    get larguraItem(){
        return this.larguraItem
    }

    set larguraItem(largura){
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
            await ItemOrcamento.database.findByIdAndUpdate(this.id, {
                idOrcamento: this.idOrcamento,
                idAmbiente: this.idAmbiente,
                idMaterial: this.idMaterial,
                idPreco: this.idPreco,
                quantidadeItem: this.quantidadeItem,
                comprimentoItem: this.comprimentoItem,
                larguraItem: this.larguraItem
            })

        }catch(error){
            console.error('Erro ao atualizar o item de orcamento no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar o item de orcamento no banco')
        }
    }

    async delete(){
        try{
            await ItemOrcamento.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar o item de orcamento no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar o item de orcamento no banco')
        }
    }
}

module.exports = ItemOrcamento