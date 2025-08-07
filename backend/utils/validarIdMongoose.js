module.exports = function validarIdMongoose(id){
    if(id.trim().length === 0 || id.length < 24 || id.length > 24){
        return false
    }

    return true
}