const Status = require('../models/Status')

module.exports = async () => {
    const statusMutaveis = ['Estoque Baixo', 'Ok', 'Em Aberto', 'Estoque Cheio', 'Estoque Transbordando']
    const statusImutaveis = ['Aguardando Pagamento', 'Cancelado', 'Orçamento Fechado']
    
    statusMutaveis.map(async (mutavel) => {
        let result = await Status.database.findOne({nome: mutavel})

        if(!result){
            const novoPadrao = new Status(padrao, true)
            await novoPadrao.create()

            process.env[padrao.toUpperCase().replace(' ', '_')] = novoPadrao.id  
        }else{
            process.env[padrao.toUpperCase().replace(' ', '_')] = result._id
        }
    })

    statusImutaveis.map(async (imutavel) => {
        let result = await Status.database.findOne({nome: imutavel})

        if(!result){
            const novoPadrao = new Status(padrao, true)
            await novoPadrao.create()

            process.env[padrao.toUpperCase().replace(' ', '_')] = novoPadrao.id  
        }else{
            process.env[padrao.toUpperCase().replace(' ', '_')] = result._id
        }
    })
}