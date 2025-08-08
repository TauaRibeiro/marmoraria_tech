const Status = require('../models/Status')

module.exports = async () => {
    const statusPadroes = ['Ok', 'Estoque Baixo', 'Estoque Cheio', 'Estoque Transbordando', 'Aguardando Pagamento', 'Cancelado']
    
    statusPadroes.map(async (padrao) => {
        let result = await Status.findOne({nome: padrao})

        if(!result){
           result = await Status.create({nome: padrao}) 
        }

        process.env[padrao.toUpperCase().replace(' ', '_')] = result._id
    })
}