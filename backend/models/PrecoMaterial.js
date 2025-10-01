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
            const resultado = await PrecoMaterial.database.find()

            return resultado.map((preco) => {
                return new PrecoMaterial(preco.idMaterial,
                    preco.valorMaterial,
                    preco.dataAplicacao,
                    preco._id,
                    preco.createdAt,
                    preco.updatedAt
                )
            })
        }catch(error){
            console.error('Erro ao fazer o find all de preço material: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find all de preço material')
        }
    }

    static async findById(id){
        try{
            const resultado = await PrecoMaterial.database.findById(id)

            if(!resultado){
                return null
            }

            return new PrecoMaterial(resultado.idMaterial,
                resultado.valorMaterial,
                resultado.dataAplicacao,
                resultado._id,
                resultado.createdAt,
                resultado.updatedAt
            )
        }catch(error){
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find by id de preço material')
        }
    }

    static async findManyBy(filtro){
        try{
            const resultado = await PrecoMaterial.database.find(filtro)

            return resultado.map((preco) => {
                return new PrecoMaterial(preco.idMaterial,
                    preco.valorMaterial,
                    preco.dataAplicacao,
                    preco._id,
                    preco.createdAt,
                    preco.updatedAt
                )
            })
        }catch(error){
            console.error('Erro ao fazer o find many by de preço material: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro ao fazer o find many by de preço material')
        }
    }

    static async findCurrentPrices(filtro= null){
        try{
            const idsUnicos = await PrecoMaterial.database.distinct('idMaterial')
            const allPrecos =  (filtro) ? await PrecoMaterial.database.find(filtro).sort({dataAplicacao: -1}) : await PrecoMaterial.database.find().sort({dataAplicacao: -1})
            let precosAtuais = allPrecos.filter((preco) => {
                for(let i = 0; i < idsUnicos.length; i++){
                    if(preco.idMaterial.toString() === idsUnicos[i].toString()){
                        return true
                    }
                }

                return false
            })

            return precosAtuais.map((preco) => {
                return new PrecoMaterial(preco.idMaterial,
                    preco.valorMaterial,
                    preco.dataAplicacao,
                    preco._id,
                    preco.createdAt,
                    preco.updatedAt
                )
            })
        }catch(error){
            console.log('Erro fazer o find dos preços atuiais dos materiais: ', error)
            throw new DataError('Internal Server Error', 500, 'Erro fazer o find dos preços atuiais dos materiais')
        }
    }

    static async deleteManyBy(filtro){
        try{
            const resultado = await PrecoMaterial.database.deleteMany(filtro)
        }catch(error){
            if(error.name !== 'Search Error'){
                console.error('Erro ao fazer o delete many de de preço material: ', error)
                throw new DataError('Internal Server Error', 500, 'Erro ao fazer o delete many de de preço material')
            }

            throw error
        }
    }

    constructor (idMaterial, valorMaterial, dataAplicacao, id= null, createdAt= new Date(), updatedAt= new Date()){
        this.idMaterial = idMaterial
        this.valorMaterial = valorMaterial
        this.dataAplicacao = dataAplicacao
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
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