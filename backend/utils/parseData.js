const DataError = require('../models/DataError')

module.exports = (date) => {
    const matches = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(date);
    
    if (matches == null) {
        throw new DataError('Type Error', 400, 'Data inválida')
    }
    
    const dia = matches[1];
    const mes = matches[2]-1;
    const ano = matches[3];

    if(parseInt(ano) > new Date().getFullYear()){
        throw new DataError('Validation Error', 400, 'O ano da data não pode ser maior que a data atual')
    }

    const data = new Date(ano, mes, dia);
    
    if(data.getDate() == dia && data.getMonth() == mes && data.getFullYear() == ano){
        if(data > Date.now()){
            throw new DataError('Validation Error', 400, 'A data não pode ser maior que a data atual')
        }
        return data
    }

    throw new DataError('Type Error', 400, 'Data inválida')
}
