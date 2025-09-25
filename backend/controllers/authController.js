const authService = require('../services/authService')

exports.login = async (req, res) => {
    try{
        const token = await authService.login(req.body)
    
        return res.status(200).json({token})
    
    }catch(error){
        return res.status(error.status).json({name: error.name, message: error.message})
    }
}