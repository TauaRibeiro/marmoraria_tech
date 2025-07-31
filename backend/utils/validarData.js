module.exports = (date) => {
    const matches = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(date);
    
    if (matches == null) {
        return false;
    }
    
    const dia = matches[1];
    const mes = matches[2]-1;
    const ano = matches[3];

    const data = new Date(ano, mes, dia);
    
    return data.getDate() == dia && data.getMonth() == mes && data.getFullYear() == ano;
}
