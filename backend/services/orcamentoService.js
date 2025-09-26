const Orcamento = require('../models/Orcamento')
const Cliente = require('../models/Cliente')
const Status = require('../models/Status')
const Ambiente = require('../models/Ambiente')
const PrecoMaterial = require('../models/PrecoMaterial')
const Material = require('../models/Material')
const ItemOrcamento = require('../models/ItemOrcamento')
const Cliente = require('../models/Cliente')
const Status = require('../models/Status')
const DataError = require('../models/DataError')

exports.createOrcamento = async (data) => {
    try {
        let {idCliente, idStatus, valorFrete, valorInstalacao, itens} = data
        let valorPagamento = 0
        
        if(!(await Cliente.findById(idCliente))){
            throw new DataError('Not Found', 404, 'Cliente não encontrado')
        }

        if(!(await Status.findById(idStatus))){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        const novoOrcamento = new Orcamento(idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao)
        await novoOrcamento.create()

        itens = itens.map(async (item) => {
            const { idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem } = item

            if(!(await Ambiente.findById(idAmbiente))){
                throw new DataError('Not Found', 404, 'Ambiente não encontrado')
            }

            if(!(await Material.findById(idMaterial))){
                throw new DataError('Not Found', 404, 'Material não encontrado')
            }

            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial}))[0]

            const novoItem = new ItemOrcamento(novoOrcamento.id, idAmbiente, idMaterial, preco.id, quantidadeItem, comprimentoItem, larguraItem)
            await novoItem.create()

            valorPagamento += comprimentoItem*larguraItem*preco.valorMaterial*quantidadeItem

            return JSON.parse(JSON.stringify(novoItem))
        })

        novoOrcamento.valorPagamento = valorPagamento
        await novoOrcamento.update()
        
        const jsonOrcamento = JSON.parse(JSON.stringify(novoOrcamento))

        return {...jsonOrcamento, 
            itens, 
            valorTotal: novoOrcamento.valorPagamento + novoOrcamento.valorFrete + novoOrcamento.valorInstalacao
        }
    } catch (error) {
        throw error
    }
}

exports.getOrcamento = async () => {
    try{
        const orcamentos = await Orcamento.findAll()
        const itens = orcamentos.map(async (orcamento) => {
            const resultado = await ItemOrcamento.findManyBy({idOrcamento: orcamento.id})

            return resultado.map((item) => JSON.parse(JSON.stringify(item)))
        })

        const result = []

        for(let i = 0; i < orcamentos.length; i++){
            const jsonOrcamento = JSON.parse(JSON.stringify(orcamentos[i]))

            result.push({...jsonOrcamento, 
                itens: itens[i], 
                valorTotal: orcamentos[i].valorPagamento + orcamentos[i].valorFrete + orcamentos[i].valorInstalacao
            })
        }

        return result
    }catch(error){
        throw error
    }
}

exports.getOrcamentoById = async (id) => {
    try{
        let orcamento = await Orcamento.findById(id)

        if(!orcamento){
            throw new DataError('Not Found', 404, 'Orçamento não encontrado')
        }

        let itens = await ItemOrcamento.findManyBy({idOrcamento: orcamento.id})

        itens = itens.map((item) => {
            return JSON.parse(JSON.stringify(item))
        })

        orcamento = JSON.parse(JSON.stringify(orcamento))
        
        return {...orcamento, 
            itens,
            valorTotal: orcamento.valorFrete + orcamento.valorInstalacao + orcamento.valorPagamento
        }
    }catch(error){
        throw error
    }
}

exports.updateOrcamento = async (data) => {
    try{
        let { id, idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao, itens } = data
        const orcamento = await Orcamento.findById(id)

        if(!orcamento){
            throw new DataError('Not Found', 404, 'Orçamento não encontrado')
        }

        let novoValor = 0

        const itensAntigos = await ItemOrcamento.findManyBy({idOrcamento: orcamento.id})

        itens = map(async (item) => {
            const { idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem } = item

            if(!(await Ambiente.findById(idAmbiente))){
                throw new DataError('Not Found', 404, 'Ambiente não encontrado')
            }

            if(!(await Material.findById(idMaterial))){
                throw new DataError('Not Found', 404, 'Material não encontrado')
            }

            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial}))[0]

            novoValor += quantidadeItem*comprimentoItem*larguraItem*preco.valorMaterial

            return new ItemOrcamento(orcamento.id, idAmbiente, idMaterial, preco.id, quantidadeItem, comprimentoItem, larguraItem)
        })

        for(let i = 0; i < itensAntigos.length; i++){
            if(itens.indexOf(itensAntigos[i]) === -1){
                await itensAntigos[i].delete()
            }
        }

        for(let i = 0; i < itens.length; i++){
            if(itensAntigos.indexOf(itens[i]) === -1){
                await itens[i].create()
            }
        }

        orcamento.idCliente = idCliente
        orcamento.idStatus = idStatus
        orcamento.valorPagamento = valorPagamento
        orcamento.valorFrete = valorFrete
        orcamento.valorInstalacao = valorInstalacao

        const jsonOrcamento = JSON.parse(JSON.stringify(orcamento))

        return {...jsonOrcamento, 
            itens: itens.map((item) => JSON.parse(JSON.stringify(item))),
            valorTotal: orcamento.valorFrete + orcamento.valorInstalacao + orcamento.valorPagamento
        }
    }catch(error){
        throw error
    }
}

exports.deleteOrcamento = async (id) => {
    try{
        if(!validarId(id)){
            return {status: 400, message: 'Message id inválido'}
        }
    
        const orcamentoDeletado = await Orcamento.findByIdAndDelete(id)
    
        if(!orcamentoDeletado){
            return {status: 404, message: 'Orcamento não encontrado'}
        }

        return {status: 200}
    }catch(error){
        console.error('Erro ao deletar o orçamento: ', error)

        return {status: 500, message: 'Erro ao deletar o orçamento'}
    }
}