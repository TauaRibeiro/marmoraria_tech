const authService = require('../services/authService')

exports.login = async (req, res) => {
    const resultado = await authService.login(req.body)

    if(resultado.status === 200){
        return res.status(200).json({token: resultado.result})
    }

    return res.status(resultado.status).json({message: resultado.message})
}