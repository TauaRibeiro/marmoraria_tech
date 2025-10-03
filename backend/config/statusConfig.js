const Status = require('../models/Status')

module.exports = async () => {
    const statusMutaveis = ['Estoque Baixo', 'Ok', 'Em Aberto', 'Estoque Cheio']
    const statusImutaveis = ['Aguardando Pagamento', 'Cancelado', 'Orçamento Fechado']
    
    statusMutaveis.map(async (mutavel) => {
        let result = await Status.database.findOne({nome: mutavel})

        if(!result){
            const novoPadrao = new Status(mutavel, true)
            await novoPadrao.create()

            process.env[mutavel.toUpperCase().replace(' ', '_')] = novoPadrao.id  
        }else{
            process.env[mutavel.toUpperCase().replace(' ', '_')] = result._id
        }
    })

    statusImutaveis.map(async (imutavel) => {
        let result = await Status.database.findOne({nome: imutavel})

        if(!result){
            const novoPadrao = new Status(imutavel, false)
            await novoPadrao.create()

            process.env[imutavel.toUpperCase().replace(' ', '_')] = novoPadrao.id  
        }else{
            process.env[imutavel.toUpperCase().replace(' ', '_')] = result._id
        }
    })
}