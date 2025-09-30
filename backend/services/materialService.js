const Material = require('../models/Material')
const Status = require('../models/Status')
const TipoMaterial = require('../models/TipoMaterial')
const PrecoMaterial = require('../models/PrecoMaterial')
const ItemOrcamento = require('../models/ItemOrcamento')
const DataError = require('../models/DataError')

exports.createMaterial = async (data) => {
    try{
        const { idTipo, nome, valorMaterial, estoqueMin, estoqueMax, estoque, dataAplicacao } = data
        const tipo = await TipoMaterial.findById(idTipo)
        
        if(!tipo){
            throw new DataError('Not Found', 404, 'Tipo não encontrado')
        }

        let idStatus

        if(estoque >= estoqueMax){
            idStatus = process.env.ESTOQUE_CHEIO
        }else if(estoque < estoqueMin){
            idStatus = process.env.ESTOQUE_BAIXO
        }else{
            idStatus = process.env.OK
        }

        const status = await Status.findById(idStatus)
        
        const novoMaterial = new Material(idTipo, idStatus, nome, estoqueMin, estoqueMax, estoque)
        
        await novoMaterial.create()

        const novoPreco = new PrecoMaterial(novoMaterial.id, valorMaterial, (dataAplicacao) ? dataAplicacao: new Date())

        await novoPreco.create()

        return {
            id: novoMaterial.id,
            tipo: tipo.nome,
            idStatus: status.nome,
            nome,
            estoque,
            estoqueMin,
            estoqueMax,
            valorMaterial: novoPreco.valorMaterial,
            createdAt: novoMaterial.createdAt,
            updatedAt: novoMaterial.updatedAt,
        }
    }catch(error){
        throw error
    }
}

exports.getMaterial = async () => {
    try{
        const precos = await PrecoMaterial.findCurrentPrices()
        
        const result = await Promise.all(precos.map(async (preco) => {
            const material = await Material.findById(preco.idMaterial)
            const tipo = await TipoMaterial.findById(material.idTipo)
            const status = await Status.findById(material.idStatus)
            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial: material.id}))[0]

            return {
                id: material.id,
                tipo: tipo.nome,
                idStatus: status.nome,
                nome: material.nome,
                estoque: material.estoque,
                estoqueMin: material.estoqueMin,
                estoqueMax: material.estoqueMax,
                valorMaterial: preco.valorMaterial,
                createdAt: material.createdAt,
                updatedAt: material.updatedAt,
            }
        }))

        return result
    }catch(error){
        throw error
    }
}

exports.getMaterialById = async (id) => {
    try{
        const material = await Material.findById(preco.idMaterial)

        if(!material){
            throw new DataError('Not Found', 404, 'Material não encontrado')
        }

        const tipo = await TipoMaterial.findById(material.idTipo)
        const status = await Status.findById(material.idStatus)
        const preco = (await PrecoMaterial.findCurrentPrices({idMaterial: material.id}))[0]

        return {
            id: material.id,
            tipo: tipo.nome,
            idStatus: status.nome,
            nome: material.nome,
            estoque: material.estoque,
            estoqueMin: material.estoqueMin,
            estoqueMax: material.estoqueMax,
            valorMaterial: preco.valorMaterial,
            createdAt: material.createdAt,
            updatedAt: material.updatedAt,
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
            throw new DataError('Dependecy Error', 400, 'Existe pelo menos um orçamento que usa este material')
        }

        await material.delete()
        await PrecoMaterial.deleteManyBy({idMaterial: material.id})
    }catch(error){
        throw error
    }
}

exports.updateMaterial = async (data) => {
    try {
        const{ id, idTipo, nome, preco, estoqueMin, estoqueMax, estoque, valorMaterial } = data

        const material = await Material.findById(id)

        if(!material){
            throw new DataError('Not Found', 404, 'Material não encontrado')
        }

        const tipo = await TipoMaterial.findById(idTipo)
        
        if(!tipo){
            throw new DataError('Not Found', 404, 'Tipo não encontrado')
        }
        
        let precoMaterial = await PrecoMaterial.findCurrentPrices({idMaterial: id})[0]

        material.idTipo = idTipo
        material.nome = nome
        material.estoqueMin = estoqueMin
        material.estoqueMax = estoqueMax
        material.estoque = estoque
        
        if(precoMaterial.valorMaterial !== preco){
            const novoPreco = new PrecoMaterial(id, valorMaterial, new Date())

            await novoPreco.create()

            precoMaterial = novoPreco
        }

        if(estoque >= estoqueMax){
            material.idStatus = process.env.ESTOQUE_CHEIO
        }else if(estoque < estoqueMin){
            material.idStatus = process.env.ESTOQUE_BAIXO
        }else{
            material.idStatus = process.env.OK
        }

        const status = await Status.findById(material.idStatus)

        await material.update()

        return{
            id: material.id,
            tipo: tipo.nome,
            status: status.nome,
            nome: material.nome,
            estoque: material.estoque,
            estoqueMin: material.estoqueMin,
            estoqueMax: material.estoqueMax,
            valorMaterial: precoMaterial.valorMaterial,
            createdAt: material.createdAt,
            updatedAt: material.updatedAt,
        }
    }catch(error) {
       throw error 
    }
}