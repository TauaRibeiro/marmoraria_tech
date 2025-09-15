const Status = require('../models/Status')

module.exports = async () => {
    const statusPadroes = ['Ok', 'Estoque Baixo', 'Estoque Cheio', 'Estoque Transbordando', 'Aguardando Pagamento', 'Cancelado', 'Status Deletado']
    
    statusPadroes.map(async (padrao) => {
        let result = await Status.database.findOne({nome: padrao})

        if(!result){
            const novoPadrao = new Status(padrao)
            await novoPadrao.create()

            process.env[padrao.toUpperCase().replace(' ', '_')] = novoPadrao.id  
        }else{
            process.env[padrao.toUpperCase().replace(' ', '_')] = result._id
        }
    })
}