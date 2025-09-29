const Material = require('../models/Material')
const Status = require('../models/Status')
const TipoMaterial = require('../models/TipoMaterial')
const PrecoMaterial = require('../models/PrecoMaterial')
const ItemOrcamento = require('../models/ItemOrcamento')
const DataError = require('../models/DataError')

exports.createMaterial = async (data) => {
    try{
        const { idTipo, idStatus, nome, valorMaterial, estoqueMin, estoqueMax, estoque, dataAplicacao } = data

        if(!(await Status.findById(idStatus))){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        if(!(await TipoMaterial.findById(idTipo))){
            throw new DataError('Not Found', 404, 'Tipo não encontrado')
        }
        
        const novoMaterial = new Material(idTipo, idStatus, nome, estoqueMin, estoqueMax, estoque)
        
        await novoMaterial.create()

        const jsonMaterial = JSON.parse(JSON.stringify(novoMaterial))

        const novoPreco = new PrecoMaterial(novoMaterial.id, valorMaterial, (dataAplicacao) ? dataAplicacao: new Date())

        await novoPreco.create()

        return {...jsonMaterial, valorMaterial: novoPreco.valorMaterial}
    }catch(error){
        throw error
    }
}

exports.getMaterial = async () => {
    try{
        const precos = await PrecoMaterial.findCurrentPrices()
        
        const result = await Promise.all(precos.map(async (preco) => {
            const material = await Material.findById(preco.idMaterial)
            
            return {
                id: material.id,
                idStatus: material.idStatus,
                idTipo: material.idTipo,
                nome: material.nome,
                valorMaterial: preco.valorMaterial,
                estoqueMin: material.estoqueMin,
                estoqueMax: material.estoqueMax,
                estoque: material.estoque,
                updatedAt: material.updatedAt,
                createdAt: material.createdAt
            }
        }))

        return result
    }catch(error){
        throw error
    }
}

exports.getMaterialById = async (id) => {
    try{
        const preco = (await PrecoMaterial.findManyBy({idMaterial: id}))[0]

        if(!preco){
            throw new DataError('Search Error', 404, 'Material não encontrado')
        }

        const material = await Material.findById(id)

        return {
            id,
            idStatus: material.idStatus,
            idTipo: material.idTipo,
            nome: material.nome,
            valorMaterial: preco.valorMaterial,
            estoqueMin: material.estoqueMin,
            esotqueMax: material.estoqueMax,
            createdAt: material.createdAt,
            updatedAt: material.updatedAt
        }
    }catch(error){
        throw error
    }
}

exports.deleteMaterial = async (id) => {
    try{
        const material = await Material.findById(id)
        
        if(!material){
            throw new DataError('Not Found', 404, 'Material não encontrado')
        }

        const orcamentos = await ItemOrcamento.findManyBy({idMaterial: id})

        if(orcamentos.length !== 0){
            throw new DataError('Relacional Error', 400, 'Existe pelo menos um orçamento que usa este material')
        }

        await material.delete()
        await PrecoMaterial.deleteManyBy({idMaterial: material.id})
    }catch(error){
        throw error
    }
}

exports.updateMaterial = async (data) => {
    try {
        const{ id, idTipo, idStatus, nome, preco, estoqueMin, estoqueMax, estoque, valorMaterial } = data

        const material = await Material.findById(id)

        if(!material){
            throw new DataError('Not Found', 404, 'Material não encontrado')
        }

        if(!(await Status.findById(idStatus))){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        if(!(await TipoMaterial.findById(idTipo))){
            throw new DataError('Not Found', 404, 'Tipo não encontrado')
        }
        
        let precoMaterial = await PrecoMaterial.findCurrentPrices({idMaterial: id})[0]

        material.idTipo = idTipo
        material.idStatus = idStatus
        material.nome = nome
        material.estoqueMin = estoqueMin
        material.estoqueMax = estoqueMax
        material.estoque = estoque
        
        if(precoMaterial.valorMaterial !== preco){
            const novoPreco = new PrecoMaterial(id, valorMaterial, new Date())

            await novoPreco.create()

            precoMaterial = JSON.parse(JSON.stringify(novoPreco))
        }else{
            precoMaterial = JSON.parse(JSON.stringify(precoMaterial))
        }

        await material.update()


        const jsonMaterial = JSON.parse(JSON.stringify(material))

        return {...jsonMaterial, valorMaterial: precoMaterial.valorMaterial}
    }catch(error) {
       throw error 
    }
}