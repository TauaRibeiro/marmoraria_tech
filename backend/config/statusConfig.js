const Status = require('../models/Status')

module.exports = async () => {
    let result = await Status.findOne({nome: "Ok"})

    if(result.length === 0){
        result = await Status.create({nome: "Ok"});
    }
    
    process.env.ID_OK = result._id

    result = Status.findOne({nome: "Estoque Baixo"})

    if(result.length === 0){
        result = await Status.create({nome: "Estoque Baixo"})
    }

    process.env.ID_ESTOQUE_BAIXO = result._id

}