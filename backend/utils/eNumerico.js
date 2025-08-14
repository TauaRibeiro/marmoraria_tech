module.exports = (input) => {
    if(typeof(input) === 'number'){
        return true
    }else if(typeof(input) === 'string'){
        if(input.length === 0){
            return false
        }

        for(let i = 0; i < input.length; i++){
            if(isNaN(parseInt(input[i]))){
                return false
            }
        }

        return true
    }

    return false
}