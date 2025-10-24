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
        
        //console.log('Tipo de valorFrete: ', typeof(valorFrete))
        //console.log('Tipo de valorIntalacao: ', typeof(valorInstalacao))
        if(!status){
            throw new DataError('Not Found', 404, 'Status não encontrado')
        }

        const novoOrcamento = new Orcamento(idCliente, idStatus, valorFrete, valorInstalacao)
        await novoOrcamento.create()

        const novosItens = []
        const atualizarMateriais = []

        for(let i = 0; i < itens.length; i++){
            const { idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem } = itens[i]

            const ambiente = await Ambiente.findById(idAmbiente)

            if(!ambiente){
                throw new DataError('Not Found', 404, 'Ambiente não encontrado')
            }

            const material = await Material.findById(idMaterial)
            
            if(!material){
                throw new DataError('Not Found', 404, 'Material não encontrado')
            }

            if(material.estoque < (comprimentoItem*larguraItem*quantidadeItem)){
                throw new DataError('Validation Error', 400, 'Não possui estoque para este material')
            }

            atualizarMateriais.push(material)

            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial}))[0]

            const novoItem = new ItemOrcamento(novoOrcamento.id, idAmbiente, idMaterial, preco.id, quantidadeItem, comprimentoItem, larguraItem)
            await novoItem.create()

            valorPagamento += comprimentoItem*larguraItem*preco.valorMaterial*quantidadeItem

            novosItens.push({
                ambiente: ambiente.nome,
                material: material.nome,
                valorMaterial: preco.valorMaterial,
                quantidadeItem,
                comprimentoItem,
                larguraItem,
                subTotal: comprimentoItem*larguraItem*preco.valorMaterial*quantidadeItem
            })
        }

        novoOrcamento.valorPagamento = valorPagamento
        await novoOrcamento.update()

        for(let i = 0 ; i < updateMateriais.length; i++){
            await updateMateriais[i].update()
        }

        return {
            id: novoOrcamento.id,
            cliente: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            telefone: cliente.telefone
            status: status.nome, 
            itens: novosItens, 
            valorPagamento,
            valorFrete,
            valorInstalacao,
            valorTotal: novoOrcamento.valorPagamento + novoOrcamento.valorFrete + novoOrcamento.valorInstalacao,
            createdAt: novoOrcamento.createdAt,
            updatedAt: novoOrcamento.updatedAt
        }
    } catch (error) {
        throw error
    }
}

exports.getOrcamento = async () => {
    try{
        const orcamentos = await Orcamento.findAll()
        let valorPagamento = 0
        let itens = []
        
        for(let i = 0; i < orcamentos.length; i++){
            const resultado = await ItemOrcamento.findManyBy({idOrcamento: orcamentos[i].id})

            for(let p = 0; p < resultado.length; p++){
                const ambiente = await Ambiente.findById(resultado[p].idAmbiente)
                const material = await Material.findById(resultado[p].idMaterial)
                const preco = await PrecoMaterial.findById(resultado[p].idPreco)

                valorPagamento += resultado[p].comprimentoItem*resultado[p].larguraItem*preco.valorMaterial*resultado[p].quantidadeItem

                itens.push({
                    ambiente: ambiente.nome,
                    material: material.nome,
                    valorMaterial: preco.valorMaterial,
                    quantidadeItem: resultado[p].quantidadeItem,
                    comprimentoItem: resultado[p].comprimentoItem,
                    larguraItem: resultado[p].larguraItem,
                    subTotal: resultado[p].comprimentoItem*resultado[p].larguraItem*preco.valorMaterial*resultado[p].quantidadeItem
                })
            }
        }

        const result = []
        for(let i = 0; i < orcamentos.length; i++){
            const cliente = await Cliente.findById(orcamentos[i].idCliente)
            const status = await Status.findById(orcamentos[i].idStatus)

            result.push({
                id: orcamentos[i].id,
                cliente: cliente.nome,
                cpf: cliente.cpf,
                email: cliente.email,
                telefone; cliente.telefone,
                status: status.nome, 
                itens, 
                valorPagamento,
                valorFrete: orcamentos[i].valorFrete,
                valorInstalacao: orcamentos[i].valorInstalacao,
                valorTotal: valorPagamento + orcamentos[i].valorFrete + orcamentos[i].valorInstalacao,
                createdAt: orcamentos[i].createdAt,
                updatedAt: orcamentos[i].updatedAt,
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

        const itens = await ItemOrcamento.findManyBy({idOrcamento: orcamento.id})
        let valorPagamento = 0
        let resultado = []

        for(let p = 0; p < itens.length; p++){
            const ambiente = await Ambiente.findById(itens[p].idAmbiente)
            const material = await Material.findById(itens[p].idMaterial)
            const preco = await PrecoMaterial.findById(itens[p].idPreco)

            valorPagamento += itens[p].comprimentoItem*itens[p].larguraItem*preco.valorMaterial*itens[p].quantidadeItem

            resultado.push({
                ambiente: ambiente.nome,
                material: material.nome,
                valorMaterial: preco.valorMaterial,
                quantidadeItem: itens[p].quantidadeItem,
                comprimentoItem: itens[p].comprimentoItem,
                larguraItem: itens[p].larguraItem,
                subTotal: itens[p].comprimentoItem*itens[p].larguraItem*preco.valorMaterial*itens[p].quantidadeItem
            })
        }

        const cliente = await Cliente.findById(orcamento.idCliente)
        const status = await Status.findById(orcamento.idStatus)
        
        return {
            id: orcamento.id,
            cliente: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            telefone: cliente.telefone,
            status: status.nome, 
            itens: resultado,
            valorPagamento: valorPagamento,
            valorFrete: orcamento.valorFrete,
            valorInstalacao: orcamento.valorInstalacao,
            valorTotal: orcamento.valorFrete + orcamento.valorInstalacao + valorPagamento,
            createdAt: orcamento.createdAt,
            updatedAt: orcamento.updatedAt
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
        
        const status = await Status.findById(idStatus)
        const statusAntigo = await Status.findById(orcamento.idStatus)

        const cliente = await Cliente.findById(idCliente)

        let valorPagamento = 0
        const itensAntigos = await ItemOrcamento.findManyBy({idOrcamento: orcamento.id})

        for(let i = 0; i < itens.length; i++){
            const { idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem } = itens[i]
            
            if(!(await Ambiente.findById(idAmbiente))){
                throw new DataError('Not Found', 404, 'Ambiente não encontrado')
            }

            if(!(await Material.findById(idMaterial))){
                throw new DataError('Not Found', 404, 'Material não encontrado')
            }

            const preco = (await PrecoMaterial.findCurrentPrices({idMaterial}))[0]

            valorPagamento += quantidadeItem*comprimentoItem*larguraItem*preco.valorMaterial

            itens[i] = new ItemOrcamento(orcamento.id, idAmbiente, idMaterial, preco.id, quantidadeItem, comprimentoItem, larguraItem)
        }

        const listaUpdate = []

        for(let i = 0; i < itensAntigos.length; i++){
            let achou = false

            for(let p = 0; p < itens.length; p++){
                if(itensAntigos[i].idMaterial.toString() === itens[p].idMaterial.toString()){
                    const qtdMaterialAntigo = itensAntigos[i].quantidadeItem * itensAntigos[i].comprimentoItem * itensAntigos[i].larguraItem
                    const qtdMaterial = itens[p].quantidadeItem * itens[p].comprimentoItem * itensAntigos[p].larguraItem

                    achou = true

                    if(qtdMaterialAntigo !== qtdMaterial){
                        const material = await Material.findById(itensAntigos[i].idMaterial)
                        material.estoque += qtdMaterialAntigo - qtdMaterial

                        if(material.estoque < 0){
                            throw new DataError('Validation Error', 400, `Não há quantidade suficiente em estoque para o item: ${material.nome}`)
                        }

                        listaUpdate.push(material)
                        itensAntigos[i].quantidadeItem = itens[p].quantidadeItem
                        itensAntigos[i].comprimentoItem = itens[p].comprimentoItem
                        itensAntigos[i].larguraItem = itens[p].larguraItem
                        await itensAntigos[i].update()
                        break
                    }
                }
            }

            if(!achou){
                const material = await Material.findById(itensAntigos[i].idMaterial)

                material.estoque += itensAntigos[i].quantidadeItem

                await itensAntigos[i].delete()
                listaUpdate.push(material)
            }
        }

        for(let i = 0; i < itens.length; i++){
            let achou = false

            for(let p = 0; p < itensAntigos.length; p++){
                if(itens[i].idMaterial.toString() === itensAntigos[p].idMaterial.toString()){
                    achou = true
                    break
                }
            }

            if(!achou){
                const material = await Material.findById(itens[i].idMaterial)
                const qtdMaterial = itens[p].quantidadeItem * itens[p].comprimentoItem * itensAntigos[p].larguraItem

                if(material.estoque - qtdMaterial < 0){
                    throw new DataError('Validation Error', 400, `Não há estoque suficiente para o item: ${material.nome}`)
                }

                await itens[i].create()
                await material.update()
            }
        }  

        //Promise.all(listaUpdate.map(async (item) => await item.update())) 
        for(let i = 0; i < listaUpdate.length; i++){
            await listaUpdate[i].update()
        }   

        orcamento.idCliente = idCliente
        orcamento.idStatus = idStatus
        orcamento.valorFrete = valorFrete
        orcamento.valorInstalacao = valorInstalacao

        let resultado = []

        for(let i = 0; i < itens.length; i++){
            const ambiente = await Ambiente.findById(itens[i].idAmbiente)
                const material = await Material.findById(itens[i].idMaterial)
                const preco = (await PrecoMaterial.findCurrentPrices({idMaterial: itens[i].idMaterial}))[0]
                
                resultado.push({
                    ambiente: ambiente.nome,
                    material: material.nome,
                    valorMaterial: preco.valorMaterial,
                    quantidadeItem: itens[i].quantidadeItem,
                    comprimentoItem: itens[i].comprimentoItem,
                    larguraItem: itens[i].larguraItem,
                    subTotal: itens[i].comprimentoItem*itens[i].larguraItem*preco.valorMaterial*itens[i].quantidadeItem
                })
        }

        await orcamento.update()
        return {
            cliente: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            telefone: cliente.telefone,
            status: status.nome, 
            itens: resultado,
            valorPagamento,
            valorFrete: orcamento.valorFrete,
            valorInstalacao: orcamento.valorInstalacao,
            valorTotal: orcamento.valorFrete + orcamento.valorInstalacao + valorPagamento,
            createdAt: orcamento[i].createdAt,
            updatedAt: orcamento[i].updatedAt,
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