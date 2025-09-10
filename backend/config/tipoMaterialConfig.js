const TipoMaterial = require('../models/schemas/TipoMaterial')

module.exports = async () => {
    const tiposPadroes = ['Tipo Deletado']

    tiposPadroes.map(async (padrao) => {
        let result = await TipoMaterial.findOne({nome: padrao})

        if(!result){
            result = await TipoMaterial.create({nome: padrao}) 
        }

        process.env[padrao.toUpperCase().replace(' ', '_')] = result._id
    })
}