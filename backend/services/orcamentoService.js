const Orcamento = require('../models/schemas/Orcamento')
const Cliente = require('../models/schemas/Cliente')
const Status = require('../models/schemas/Status')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')


exports.createOrcamento = async (data) => {
    try {
        let {idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao} = data

        if(!idCliente || !idStatus || !valorPagamento){
            return {status: 400, message: "Os campos idCliente, idStatus, valorPagamento e valorFrete ou valorInstalacao são obrigatórios"}
        }

        if(!validarId(idCliente) || !validarId(idStatus)){
            return {status: 400, message: "Id inválido de cliente e/ou status"}
        }

        if(!(await Cliente.findById(idCliente))){
            return {status: 404, message: "Cliente não encontrado"}
        }

        if(!(await Status.findById(idStatus))){
            return {status: 404, message: "Status não encontrado"}
        }

        valorFrete = (valorFrete) ? valorFrete : 0
        valorInstalacao = (valorInstalacao) ? valorInstalacao : 0

        if(!eNumerico(valorFrete) || !eNumerico(valorPagamento) || !eNumerico(valorInstalacao)){
            return {status: 400, message: "Os valores devem ser um número válido"}
        }

        valorFrete = parseFloat(valorFrete)
        valorInstalacao = parseFloat(valorInstalacao)
        valorPagamento = parseFloat(valorPagamento)

        if(valorFrete < 0 || valorInstalacao < 0 || valorPagamento < 0){
            return {status: 400, message: "Os valores devem ser maiores ou iguais a zero"}
        }

        await Orcamento.create({
            idCliente: idCliente.trim(),
            idStatus: idStatus.trim(),
            valorPagamento: valorPagamento.toFixed(2),
            valorFrete: valorFrete.toFixed(2),
            valorInstalacao: valorInstalacao.toFixed(2)
        })

        return {status: 201}
    } catch (error) {
        console.error('Erro ao criar orcamento: ', error)
        return {status: 500, message: "Erro ao criar orcamento"}
    }
}

exports.getOrcamento = async () => {
    try{
        let result = await Orcamento.find()

        const newResult = result.map((orcamento) => {
            const {_id, idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao} = orcamento

            return {
                _id,
                idCliente,
                idStatus,
                valorPagamento,
                valorFrete,
                valorInstalacao,
                valorTotal: valorPagamento+valorFrete+valorInstalacao
            }
        })

        return {status: 200, result: newResult}
    }catch(error){
        console.error('Erro ao fazer o get de Orcamentos: ', error)

        return {status: 500, message: 'Erro ao fazer o get de Orcamentos'}
    }
}

exports.getOrcamentoById = async (id) => {
    try{
        if(!validarId(id)){
            return {status: 400, message: "Id inválido"}
        }
    
        const result = await Orcamento.findById(id)
    
        if(!result){
            return {status: 404, message: "Orcamento não encontrado"}
        }

        const {_id, idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao} = result

        return {status: 200, result: {
            _id,
            idCliente,
            idStatus,
            valorPagamento,
            valorFrete,
            valorInstalacao,
            valorTotal: valorPagamento+valorFrete+valorInstalacao
        }}
    }catch(error){
        console.error('Erro ao fazer o get por id de orcamento: ', error)
        
        return {status: 500, message: 'Erro ao fazer o get por id de orcamento'}
    }
}

exports.updateOrcamento = async (data) => {
    try{
        
        if(!validarId(data.id)){
            return {status: 400, message: "Id inválido"}
        }
        
        const antigoOrcamento = await Orcamento.findById(data.id)

        if(!antigoOrcamento){
            return {status: 404, message: "Orcamento não encontrado"}
        }
        
        let {idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao} = data
    
        if(!idCliente || !idStatus || !valorPagamento || !valorFrete || !valorInstalaca){
            return {status: 400, message: "Os campos idCliente, idStatus, valorPagamento e valorFrete ou valorInstalacao são obrigatórios"}
        }
    
        if(!validarId(idCliente) || !validarId(idStatus)){
            return {status: 400, message: "Id inválido de cliente e/ou status"}
        }
    
        if(!(await Cliente.findById(idCliente))){
            return {status: 404, message: "Cliente não encontrado"}
        }
    
        if(!(await Status.findById(idStatus))){
            return {status: 404, message: "Status não encontrado"}
        }
    
        valorFrete = (valorFrete) ? valorFrete : 0
        valorInstalacao = (valorInstalacao) ? valorInstalacao : 0
    
        if(!eNumerico(valorFrete) || !eNumerico(valorPagamento) || !eNumerico(valorInstalacao)){
            return {status: 400, message: "Os valores devem ser um número válido"}
        }
    
        valorFrete = parseFloat(valorFrete)
        valorInstalacao = parseFloat(valorInstalacao)
        valorPagamento = parseFloat(valorPagamento)
    
        if(valorFrete < 0 || valorInstalacao < 0 || valorPagamento < 0){
            return {status: 400, message: "Os valores devem ser maiores ou iguais a zero"}
        }

        await antigoOrcamento.updateOne({
            idCliente: idCliente.trim(),
            idStatus: idStatus.trim(),
            valorPagamento: valorPagamento.toFixed(2),
            valorFrete: valorFrete.toFixed(2),
            valorInstalacao: valorInstalacao.toFixed(2)
        })

        return {status: 200}
    }catch(error){
        console.error('Erro ao atualizar orcamento: ', error)

        return {status: 500, message: "Erro ao atualizar orcamento"}
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