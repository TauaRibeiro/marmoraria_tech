module.exports = (date) => {
    const matches = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(date);
    
    if (matches == null) {
        return false;
    }
    
    const dia = matches[1];
    const mes = matches[2]-1;
    const ano = matches[3];

    if(parseInt(ano) > new Date().getFullYear()){
        return false
    }

    const data = new Date(ano, mes, dia);
    
    if(data.getDate() == dia && data.getMonth() == mes && data.getFullYear() == ano){
        return data
    }

    return false
}
