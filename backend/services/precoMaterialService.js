const PrecoMaterial = require('../models/PrecoMaterial')
const Material = require('../models/Material')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')
const validarData = require('../utils/parseData')

exports.createPrecoMaterial = async (data) => {
    try {
        let {idMaterial, valorMaterial, dataAplicacao} = data
        
        if(!idMaterial || !valorMaterial){
            return {status: 400, message: "Id do material e valor do material são obrigatórios"}
        }

        if(!validarId(idMaterial)){
            return {status: 400, message: "Id do material inválido"}
        }

        const material = await Material.findById(idMaterial)

        if(!material){
            return {status: 404, message: "Material não encontrado"}
        }

        valorMaterial = valorMaterial.replace(',', '.')
        if(!eNumerico(valorMaterial) || parseFloat(valorMaterial) <= 0){
            return {status: 400, message: "Valor de material precisa ser um número válido"}
        }

        if(dataAplicacao && !validarData(dataAplicacao)){
            return {status: 400, message: "Data de aplicação inválida"}
        }else if(dataAplicacao){
            dataAplicacao = validarData(dataAplicacao)
        }else{
            dataAplicacao = null
        }

        await PrecoMaterial.create({
            idMaterial,
            dataAplicacao: dataAplicacao ?? new Date(),
            valorMaterial: parseFloat(valorMaterial).toFixed(2),
        })

        return {status: 201}
    } catch (error) {
        console.error('Erro ao criar preço de material ', error)
        return {status: 500, message: "Erro ao criar preço material"}
    }
}

exports.getAllPrecoMaterial = async () => {
    try{
        return {status: 200, result: await PrecoMaterial.find()}
    }catch(error){
        console.error('Erro ao pegar preços de materiais: ', error)

        return {status: 500, message: "Erro ao pegar preços de materiais"}
    }
}

exports.getPrecoMaterial = async () => {
    try {
        const idsUnicos = await PrecoMaterial.distinct('idMaterial')
        const allResults = await PrecoMaterial.find().sort({dataAplicacao: -1})
        
        const result = idsUnicos.map((id) => {
            let resultado = null
            console.log('Começou o loop')
            for(let i = 0; i < allResults.length; i++){
                if(id.toString() === allResults[i].idMaterial.toString()){
                    console.log('Retornou: ', allResults[i])
                    resultado = allResults[i]
                    break
                }
            }
            
            return resultado
        })
        
       
        return {status: 200, result}
    } catch (error) {
        console.error('Erro ao fazer o get de precoMaterial: ', error)
        return {status: 500, message: "Erro ao pegar preços de materiais"}
    }
}

exports.getPrecoMaterialById = async (id) => {
    try{
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
    
        const result = await PrecoMaterial.findById(id)
    
        if(!result){
            return {status: 404, message: "Preco não encontrado"}
        }
    
        return {status: 200, result}
    }catch(error){
        console.error('Erro ao pegar preço por id: ', error)

        return {status: 500, message: "Erro ao pegar preço por id"}
    }
}
