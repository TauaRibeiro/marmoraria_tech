const orcamentoService = require('../services/orcamentoService')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')

exports.create = async (req, res) => {
    try{
        let {idCliente, idStatus, valorFrete, valorInstalacao, itens} = req.body

        if(!idCliente || !idStatus || !valorFrete || !valorInstalacao || !itens){
            return res.status(400).json({name: "Parameter Error", message: "idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao e itens são obrigatóritos"})
        }

        idCliente = idCliente.trim()
        idStatus = idStatus.trim()
        valorFrete = (typeof(valorFrete) === 'number') ? valorFrete.toString() : valorFrete.trim().replace(',', '.')

        if(!validarId(idCliente)){
            return res.status(400).json({name: 'Invalid Id', message: "Id de cliente inválido"})
        }

        if(!validarId(idStatus)){
            return res.status(400).json({name: 'Invalid Id', message: "Id de status inválido"})
        }

        if(!eNumerico(valorFrete) || parseFloat(valorFrete) < 0){
            return res.status(400).json({name: 'Validation Error', message: "Valor do frete inválido"})
        }

        valorFrete = parseFloat(valorFrete)

        if(!eNumerico(valorInstalacao) || parseFloat(valorInstalacao) < 0){
            return res.status(400).json({name: 'Validation Error', message: "Valor de instalação inválido"})
        }

        valorInstalacao = parseFloat(valorInstalacao)

        itens = itens.map((item) => {
            let {idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem} = item

            if(!idAmbiente || !idMaterial || !quantidadeItem || !comprimentoItem || !larguraItem){
                return res.stauts(400).json({name: "Parameter Error", message: "Um dos itens não possui idOrcamento, idMaterial, idPreco, quantidadeItem, comprimentoItem, larguraItem"})
            }

            idAmbiente = idAmbiente.trim()
            idMaterial = idMaterial.trim()
            quantidadeItem = (typeof(quantidadeItem) === 'number') ? quantidadeItem.toString() : quantidadeItem.trim()
            comprimentoItem = (typeof(comprimentoItem) === 'number') ? comprimentoItem.toString() : comprimentoItem.trim().replace(',', '.')
            larguraItem = (typeof(larguraItem) === 'number') ? larguraItem.toString() : larguraItem.trim().replace(',', '.')

            if(!validarId(idAmbiente)){
                return res.status(400).json({name: "Invalid Id", message: "Id de ambiente inválido"})
            }

            if(!validarId(idMaterial)){
                return res.status(400).json({name: "Invalid Id", message: "Id de material inválido"})
            }

            if(!eNumerico(quantidadeItem) || parseInt(quantidadeItem) <= 0){
                return res.status(400).json({name: "Validation Error", message: "Quantidade inválida"})
            }

            if(!eNumerico(comprimentoItem) || parseFloat(comprimentoItem) <= 0){
                return res.status(400).json({name: "Validation Error", message: "Comprimento inválido"})
            }

            comprimentoItem = parseFloat(comprimentoItem).toFixed(2)

            if(!eNumerico(larguraItem) || parseFloat(larguraItem) <= 0){
                return res.status(400).json({name: "Validation Error", message: "Largura inválida"})
            }

            larguraItem = parseFloat(larguraItem).toFixed(2)

            return {idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem}
        })

        const result = await orcamentoService.createOrcamento({idCliente, idStatus, valorFrete, valorInstalacao, itens})

        return res.status(201).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getAll = async (_, res) => {
    try{
        const result = await orcamentoService.getOrcamento()

        return res.status(200).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.getById = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        const result = await orcamentoService.getOrcamentoById(id)

        return res.status(200).json({result})
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        let {idCliente, idStatus, valorFrete, valorInstalacao, itens} = req.body

        if(!idCliente || !idStatus || !valorFrete || !valorInstalacao || !itens){
            return res.status(400).json({name: "Parameter Error", message: "idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao e itens são obrigatóritos"})
        }

        idCliente = idCliente.trim()
        idStatus = idStatus.trim()
        valorFrete = (typeof(valorFrete) === 'number') ? valorFrete.toString() : valorFrete.trim().replace(',', '.')

        if(!validarId(idCliente)){
            return res.status(400).json({name: 'Invalid Id', message: "Id de cliente inválido"})
        }

        if(!validarId(idStatus)){
            return res.status(400).json({name: 'Invalid Id', message: "Id de status inválido"})
        }

        if(!eNumerico(valorFrete) || parseFloat(valorFrete) < 0){
            return res.status(400).json({name: 'Validation Error', message: "Valor do frete inválido"})
        }

        valorFrete = parseFloat(valorFrete)

        if(!eNumerico(valorInstalacao) || parseFloat(valorInstalacao) < 0){
            return res.status(400).json({name: 'Validation Error', message: "Valor de instalação inválido"})
        }

        valorInstalacao = parseFloat(valorInstalacao)

        itens = itens.map((item) => {
            let {idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem} = item

            if(!idAmbiente || !idMaterial || !quantidadeItem || !comprimentoItem || !larguraItem){
                return res.stauts(400).json({name: "Parameter Error", message: "Um dos itens não possui idOrcamento, idMaterial, idPreco, quantidadeItem, comprimentoItem, larguraItem"})
            }

            idAmbiente = idAmbiente.trim()
            idMaterial = idMaterial.trim()
            quantidadeItem = (typeof(quantidadeItem) === 'number') ? quantidadeItem.toString() : quantidadeItem.trim()
            comprimentoItem = (typeof(comprimentoItem) === 'number') ? comprimentoItem.toString() : comprimentoItem.trim().replace(',', '.')
            larguraItem = (typeof(larguraItem) === 'number') ? larguraItem.toString() : larguraItem.trim().replace(',', '.')

            if(!validarId(idAmbiente)){
                return res.status(400).json({name: "Invalid Id", message: "Id de ambiente inválido"})
            }

            if(!validarId(idMaterial)){
                return res.status(400).json({name: "Invalid Id", message: "Id de material inválido"})
            }

            if(!eNumerico(quantidadeItem) || parseInt(quantidadeItem) <= 0){
                return res.status(400).json({name: "Validation Error", message: "Quantidade inválida"})
            }

            if(!eNumerico(comprimentoItem) || parseFloat(comprimentoItem) <= 0){
                return res.status(400).json({name: "Validation Error", message: "Comprimento inválido"})
            }

            comprimentoItem = parseFloat(comprimentoItem).toFixed(2)

            if(!eNumerico(larguraItem) || parseFloat(larguraItem) <= 0){
                return res.status(400).json({name: "Validation Error", message: "Largura inválida"})
            }

            larguraItem = parseFloat(larguraItem).toFixed(2)

            return {idAmbiente, idMaterial, quantidadeItem, comprimentoItem, larguraItem}
        })

        const result = await orcamentoService.updateOrcamento({id, idCliente, idStatus, valorFrete, valorInstalacao, itens})

        return res.status(200).json(result)
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const id = req.params.id.trim()

        if(!validarId(id)){
            return res.status(400).json({name: "Invalid Id", message: "Id inválido"})
        }

        await orcamentoService.deleteOrcamento(id)

        return res.sendStatus(200)
    }catch(error){
        if(!error.status){
            console.error(error)
            return res.status(500).json({name: "Uncaugth Error", message: "Erro interno não tratado"})
        }

        return res.status(error.status).json({name: error.name, message: error.message})
    }
}