const ItemOrcamento = require('../models/ItemOrcamento')
const Orcamento = require('../models/Orcamento')
const Ambiente = require('../models/Ambiente')
const Material = require('../models/Material')
const PrecoMaterial = require('../models/PrecoMaterial')
const validarId = require('../utils/validarIdMongoose')
const eNumerico = require('../utils/eNumerico')

exports.createItemOrcamento = async (data) => {
    try{
        let {idOrcamento, idAmbiente, idMaterial, idPreco, 
            quantidadeItem, comprimentoItem, larguraItem
        } = data
    
        if(!idOrcamento || !idAmbiente || !idMaterial || !idPreco ||
            !quantidadeItem || !comprimentoItem || !larguraItem){
            return {status: 400, message: "idOrcamento, idAmbiente, idMaterial, idPreco, quantidadeItem"
                + "comprimentoItem e largura item são obrigatórios"}
        }
    
        if(!validarId(idOrcamento)){
            return {status: 400, message: "idOrcamento inválido"}
        }
        
        if(!(await Orcamento.findById(idOrcamento))){
            return {status: 404, message: "Orcamento não encontrado"}
        }
        
        if(!validarId(idAmbiente)){
            return {status: 400, message: "idAmbiente inválido"}
        }
        
        if(!(await Ambiente.findById(idAmbiente))){
            return {status: 404, message: "Ambiente não encontrado"}
        }
    
        if(!validarId(idMaterial)){
            return {status: 400, message: "idMaterial inválido"}
        }
    
        if(!(await Material.findById(idMaterial))){
            return {status: 404, message: "Material não encontrado"}
        }    
    
        if(!validarId(idPreco)){
            return {status: 400, message: "idPreco inválido"}
        }
    
        if(!(await PrecoMaterial.findById(idPreco))){
            return {status: 404, message: "Preço não encontrado"}
        }
    
        quantidadeItem = quantidadeItem.replace(',', '.')
        comprimentoItem = comprimentoItem.replace(',', '.')
        larguraItem = larguraItem.replace(',', '.')
    
        if(!eNumerico(quantidadeItem) || !eNumerico(comprimentoItem) || !eNumerico(larguraItem)){
            return {status: 400, message: 'O valores de comprimento, quantidade e largura devem ser do tipo númerico'}
        }

        await ItemOrcamento.create({
            idAmbiente: idAmbiente.trim(),
            idMaterial: idMaterial.trim(),
            idOrcamento: idOrcamento.trim(),
            idPreco: idPreco.trim(),
            quantidadeItem: parseInt(quantidadeItem.trim()),
            comprimentoItem: parseFloat(comprimentoItem.trim()).toFixed(),
            larguraItem: parseFloat(larguraItem.trim()).toFixed(2)
        })

        return {status: 201}
    }catch(error){
        console.log('Erro ao criar orcamento: ', error)
        return {status: 500, message: 'Erro ao criar orcamento'}
    }
}
