const Orcamento = require('../models/Orcamento')
const Cliente = require('../models/Cliente')
const Status = require('../models/Status')
const Ambiente = require('../models/Ambiente')
const PrecoMaterial = require('../models/PrecoMaterial')
const Material = require('../models/Material')
const ItemOrcamento = require('../models/ItemOrcamento')
const DataError = require('../models/DataError')

exports.createOrcamento = async (data) => {
    try {
        let {idCliente, idStatus, valorFrete, valorInstalacao, itens} = data
        let valorPagamento = 0
        const cliente = await Cliente.findById(idCliente)
        
        if(!cliente){
            throw new DataError('Not Found', 404, 'Cliente não encontrado')
        }

        const status = await Status.findById(idStatus)
        
        if(!status){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        const novoOrcamento = new Orcamento(idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao)
        await novoOrcamento.create()

        itens = itens.map(async (item) => {
            const { idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem } = item
            
            const ambiente = await Ambiente.findById(idAmbiente)
            
            if(!ambiente){
                throw new DataError('Not Found', 404, 'Ambiente não encontrado')
            }

            const material = await Material.findById(idMaterial)
            
            if(!material){
                throw new DataError('Not Found', 404, 'Material não encontrado')
            }

            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial}))[0]

            const novoItem = new ItemOrcamento(novoOrcamento.id, idAmbiente, idMaterial, preco.id, quantidadeItem, comprimentoItem, larguraItem)
            await novoItem.create()

            valorPagamento += comprimentoItem*larguraItem*preco.valorMaterial*quantidadeItem

            return {
                ambiente: ambiente.nome,
                material: material.nome,
                valorMaterial: preco.valorMaterial,
                quantidadeItem,
                comprimentoItem,
                larguraItem,
                subTotal: comprimentoItem*larguraItem*preco.valorMaterial*quantidadeItem
            }
        })

        novoOrcamento.valorPagamento = valorPagamento
        await novoOrcamento.update()

        return {
            cliente: cliente.nome,
            status: status.nome, 
            itens, 
            valorPagamento,
            valorFrete,
            valorInstalacao,
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

            return resultado.map(async (item) => {
                const ambiente = await Ambiente.findById(item.idAmbiente)
                const material = await Material.findById(item.idMaterial)
                const preco = (await PrecoMaterial.findCurrentPrices({idMaterial: item.idMaterial}))[0]
                
                return {
                    ambiente: ambiente.nome,
                    material: material.nome,
                    valorMaterial: preco.valorMaterial,
                    quantidadeItem: item.quantidadeItem,
                    comprimentoItem: item.comprimentoItem,
                    larguraItem: item.larguraItem,
                    subTotal: item.comprimentoItem*item.larguraItem*preco.valorMaterial*item.quantidadeItem
                }
            })
        })

        const result = []

        for(let i = 0; i < orcamentos.length; i++){
            const cliente = await Cliente.findById(orcamentos[i].idCliente)
            const status = await Status.findById(orcamentos[i].idStatus)

            result.push({
                cliente: cliente.nome,
                status: status.nome, 
                itens, 
                valorPagamento: orcamentos[i].valorPagamento,
                valorFrete: orcamentos[i].valorFrete,
                valorInstalacao: orcamentos[i].valorInstalacao,
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

        itens = itens.map(async (item) => {
            const ambiente = await Ambiente.findById(item.idAmbiente)
            const material = await Material.findById(item.idMaterial)
            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial: item.idMaterial}))[0]
            
            return {
                ambiente: ambiente.nome,
                material: material.nome,
                valorMaterial: preco.valorMaterial,
                quantidadeItem: item.quantidadeItem,
                comprimentoItem: item.comprimentoItem,
                larguraItem: item.larguraItem,
                subTotal: item.comprimentoItem*item.larguraItem*preco.valorMaterial*item.quantidadeItem
            }
        })

        const cliente = await Cliente.findById(orcamentos[i].idCliente)
        const status = await Status.findById(orcamentos[i].idStatus)
        
        return {
            cliente: cliente.nome,
            status: status.nome, 
            itens,
            valorPagamento: orcamento.valorPagamento,
            valorFrete: orcamento.valorFrete,
            valorInstalacao: orcamento.valorInstalacao,
            valorTotal: orcamento.valorFrete + orcamento.valorInstalacao + orcamento.valorPagamento
        }
    }catch(error){
        throw error
    }
}

exports.updateOrcamento = async (data) => {
    try{
        let { id, idCliente, idStatus, valorFrete, valorInstalacao, itens } = data
        const orcamento = await Orcamento.findById(id)

        if(!orcamento){
            throw new DataError('Not Found', 404, 'Orçamento não encontrado')
        }

        const cliente = await Cliente.findById(idCliente)
        const status = await Status.findById(idStatus)

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

        let valorPagamento = 0

        for(let i = 0; i < itensAntigos.length; i++){
            if(itens.indexOf(itensAntigos[i]) === -1){
                await itensAntigos[i].delete()
            }else{
                const preco = await PrecoMaterial.findById(itensAntigos[i].idPreco)

                valorPagamento += preco.valorMaterial
            }
        }

        for(let i = 0; i < itens.length; i++){
            if(itensAntigos.indexOf(itens[i]) === -1){
                await itens[i].create()

                const preco = await PrecoMaterial.findById(itensAntigos[i].idPreco)

                valorPagamento += preco.valorMaterial
            }
        }

        orcamento.idCliente = idCliente
        orcamento.idStatus = idStatus
        orcamento.valorFrete = valorFrete
        orcamento.valorInstalacao = valorInstalacao

        return {
            cliente: cliente.nome,
            status: status.nome, 
            itens: itens.map(async (item) => {
                const ambiente = await Ambiente.findById(item.idAmbiente)
                const material = await Material.findById(item.idMaterial)
                const preco = (await PrecoMaterial.findCurrentPrices({idMaterial: item.idMaterial}))[0]
                
                return {
                    ambiente: ambiente.nome,
                    material: material.nome,
                    valorMaterial: preco.valorMaterial,
                    quantidadeItem: item.quantidadeItem,
                    comprimentoItem: item.comprimentoItem,
                    larguraItem: item.larguraItem,
                    subTotal: item.comprimentoItem*item.larguraItem*preco.valorMaterial*item.quantidadeItem
                }
            }),
            valorPagamento,
            valorFrete: orcamento.valorFrete,
            valorInstalacao: orcamento.valorInstalacao,
            valorTotal: orcamento.valorFrete + orcamento.valorInstalacao + orcamento.valorPagamento
        }
    }catch(error){
        throw error
    }
}

exports.deleteOrcamento = async (id) => {
    try{
        const orcamento = await Orcamento.findById(id)

        if(!orcamento){
            throw new DataError('Not Found', 404, 'Orcamento não encontrado')
        }

        await ItemOrcamento.deleteManyBy({idOrcamento: id})
        await orcamento.delete()
    }catch(error){
        throw error
    }
}