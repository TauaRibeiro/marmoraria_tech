const Orcamento = require('../models/Orcamento')
const Cliente = require('../models/Cliente')
const Status = require('../models/Status')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')


exports.createOrcamento = async (data) => {
    try {
        let {idCliente, idStatus, valorPagamento, valorFrete, valorInstalacao} = data

        if(!idCliente || !idStatus || !valorPagamento || (!valorFrete && !valorInstalacao)){
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
            idStatsu: idStatus.trim(),
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