const DataError = require('./DataError')
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

class PrecoMaterial{
    static database = database.model('PrecoMaterial', precoMaterialSchema)

    static async findAll(){
        try{
            return await PrecoMaterial.database.find()
        }catch(error){
            console.error('Erro ao fazer o find all de preço material: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de preço material')
        }
    }

    static async findById(id){
        try{
            const resultado = await PrecoMaterial.database.findById(id)

            if(!resultado){
                throw new DataError('Invalid Id', 404, 'Preço do material não encontrado')
            }

            return resultado
        }catch(error){
            if(error.name !== 'Invalid Id'){
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find by id de preço material')
            }

            throw error
        }
    }

    static async findManyBy(filtro){
        try{
            const resultado = await PrecoMaterial.database.find(filtro)

            if(resultado.length === 0){
                throw new DataError('Search Error', 404, 'Nenhum preço de material encontrado')
            }

            return resultado
        }catch(error){
            if(error.name !== 'Search Error'){
                console.error('Erro ao fazer o find many by de preço material: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de preço material')
            }

            throw error
        }
    }

    static async findCurrentPrices(){
        try{
            const idsUnicos = await PrecoMaterial.database.distinct('idMaterial')
            const precos = await PrecoMaterial.database.find().sort({dataAplicacao: -1})
            
            const precosAtuais = idsUnicos.map((id) => {
                let resultado = null
    
                for(let i = 0; i < allResults.length; i++){
                    if(id.toString() === precos[i].idMaterial.toString()){
                        resultado = allResults[i]
                        break
                    }
                }
                
                return resultado
            })
            
           
            return precosAtuais
        }catch(error){
            console.log('Erro fazer o find dos preços atuiais dos materiais: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro fazer o find dos preços atuiais dos materiais')
        }
    }

    static async deleteManyBy(filtro){
        try{
            const resultado = await PrecoMaterial.database.deleteMany(filtro)

            if(resultado.deletedCount === 0){
                throw new DataError('Search Error', 404, 'Nenhum preço de material encontrado')
            }
        }catch(error){
            if(error.name !== 'Search Error'){
                console.error('Erro ao fazer o delete many de de preço material: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o delete many de de preço material')
            }

            throw error
        }
    }

    constructor (idMaterial, valorMaterial, dataAplicacao){
        this.idMaterial = idMaterial
        this.valorMaterial = valorMaterial,
        this.dataAplicacao = dataAplicacao
    }

    get idMaterial(){
        return this.idMaterial
    }

    set idMaterial(novoId){
        this.idMaterial = novoId
    }

    get valorMaterial(){
        return this.valorMaterial
    }

    set valorMaterial(novoValor){
        this.valorMaterial = novoValor
    }

    get dataAplicacao(){
        return this.dataAplicacao
    }

    set dataAplicacao(novaData){
        this.dataAplicacao = novaData
    }

    async create(){
        try{
            const novoPreco = await PrecoMaterial.database.create({
                idMaterial: this.idMaterial,
                valorMaterial: this.valorMaterial,
                dataAplicacao: this.dataAplicacao
            })

            this.id = novoPreco._id
        }catch(error){
            console.error('Erro ao adicionar um novo preco de material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao adicionar um novo preco de material no banco')
        }
    }

    async delete(){
        try{
            await PrecoMaterial.database.findByIdAndDelete(this.id)
        }catch(error){
            console.error('Erro ao deletar um preco de material no banco: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao deletar um preco de material no banco')
        }
    }
}

module.exports = PrecoMaterial