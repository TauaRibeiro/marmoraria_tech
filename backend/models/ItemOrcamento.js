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
}, {timestamps: true});

class ItemOrcamento{
    static database = database.model('ItemOrcamento', itemOrcamentoSchema)
 
    static async findAll(){
        try{
            const result = await ItemOrcamento.database.find()
            return result.map((item) => {
                return new ItemOrcamento(item.idOrcamento, 
                    item.idAmbiente, 
                    item.idMaterial, 
                    item.idPreco, 
                    item.quantidadeItem,
                    item.comprimentoItem,
                    item.larguraItem,
                    item._id,
                    item.createdAt,
                    item.updatedAt
                )
            })
        }catch(error){
            console.error('Erro ao fazr o find all de Item Orcamento: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazr o find all de Item Orcamento')
        }
    }
    
    static async findById(id){
        try{    
            const item = await ItemOrcamento.database.findById(id.trim())
            
            if(!item){
                return null
            }
            
            return new ItemOrcamento(item.idOrcamento, 
                item.idAmbiente, 
                item.idMaterial, 
                item.idPreco, 
                item.quantidadeItem,
                item.comprimentoItem,
                item.larguraItem,
                item._id,
                item.createdAt,
                item.updatedAt
            )
        }catch(error){
            console.error('Erro ao fazer o find por id de item de orcamento no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find por id de item de orcamento no banco')
        }
    }

    static async findManyBy(filtro){
        try{
            const result = await ItemOrcamento.database.find(filtro)

            return result.map((item) => {
                return new ItemOrcamento(item.idOrcamento, 
                    item.idAmbiente, 
                    item.idMaterial, 
                    item.idPreco, 
                    item.quantidadeItem,
                    item.comprimentoItem,
                    item.larguraItem,
                    item._id,
                    item.createdAt,
                    item.updatedAt
                )
            })
        }catch(error){
            console.error('Erro ao fazr o find many by de Item Orcamento: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de Item Orcamento')
        }
    }

    static async updateManyBy(filtro, data){
        try{
            await ItemOrcamento.database.updateMany(filtro, data)
        }catch(error){
            console.error('Erro ao atualizar vários itens no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao atualizar vários itens no banco')
        }
    }

    static async deleteManyBy(filtro){
        try{
            await ItemOrcamento.database.deleteMany(filtro)
        }catch(error){
            console.error('Erro ao deletar vários itens no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar vários itens no banco')
        }
    }

    constructor(idOrcamento, idAmbiente, idMaterial, idPreco, quantidadeItem, comprimentoItem, larguraItem, 
                id= null, createdAt= new Date(), updatedAt= new Date()){
        this.idOrcamento = idOrcamento
        this.idAmbiente = idAmbiente
        this.idMaterial = idMaterial
        this.idPreco = idPreco
        this.quantidadeItem = quantidadeItem
        this.comprimentoItem = comprimentoItem
        this.larguraItem = larguraItem
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
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