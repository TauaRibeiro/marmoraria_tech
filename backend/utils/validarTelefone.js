const eNumerico = require('./eNumerico')

module.exports = (telefone) => {
    if(typeof(telefone) === 'number'){
        telefone = JSON.stringify(telefone)
    }
    if(telefone.length !== 8 && telefone.length !== 9 && telefone.length !== 11 && telefone.length !== 13 && telefone.length !== 14){
        return false
    }
    
    if(telefone.length >= 13){
        if(telefone.length === 14 && telefone[0] !== '+'){
            return false
        }else if(telefone.length === 14){
            telefone = telefone.replace('+', '')
        }
        
        if(!telefone.startsWith('55')){
            return false
        }
    }

    return eNumerico(telefone)
}