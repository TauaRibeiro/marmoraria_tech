const TipoMaterial = require('../models/TipoMaterial')

module.exports = async () => {
    const tiposPadroes = ['Tipo Deletado']

    tiposPadroes.map(async (padrao) => {
        let result = await TipoMaterial.database.findOne({nome: padrao})

        if(!result){
            result = await TipoMaterial.database.create({nome: padrao}) 
        }

        process.env[padrao.toUpperCase().replace(' ', '_')] = result._id
    })
}