module.exports = (input) => {
    if(typeof(input) === 'number'){
        return true
    }else if(typeof(input) === 'string'){
        
        if(input.trim().length === 0){
            return false
        }

        if(input.indexOf('.') === input.length-1 || input.indexOf('.') === 0){
            return false
        }

        if(input.indexOf('.') !== input.lastIndexOf('.')){
            return false
        }
        
        for(let i = 0; i < input.trim().length; i++){
            if(isNaN(parseInt(input[i]))){
                if((input[i] === '.' && !isNaN(parseInt(input[i-1])))){
                    continue
                }

                return false
            }
        }

        return true
    }

    return false
}