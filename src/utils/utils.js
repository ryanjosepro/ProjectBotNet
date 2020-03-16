//Texts
const letters = text => {
    return text.trim().split('');
}

const lastLetter = text => {
    let content = letters(text);
    return content[content.length - 1];
}

const words = text => {
    text.trim().split(' ');
}

const lastWord = text => {
    let content = words(text);
    return content[content.length - 1];
}

//Validators
const checkCNPJ = cnpj => {
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

//Transformators
const commandToObj = (commandText, commandKey = '/', paramKey = '-') => {
    //Local functions
    const  isCommand = text => {
        return text == undefined ? false : (letters(text)[0] === commandKey);
    }

    const isContent = text => {
        return text == undefined ? false : letters(text)[0] != paramKey && !isCommand(text);
    }

    const isParam = text => {
        return text == undefined ? false : letters(text)[0] === paramKey && !isCommand(text);
    }
    
    let objCommand = {
        command: '',
        contents: [],
        params: {}
    }

    //Transforming
    const commandPartsRegex = /(('[^']*')|("[^"]*"))|\S+/g;
    const commandParts = commandText.match(commandPartsRegex);    

    if (isCommand(commandParts[0])) {
        objCommand.command = commandParts[0];
    }

    commandParts.map((value, index, array) => {
        if (isContent(value) && (!isParam(array[index -1]))) {
            objCommand.contents.push(value);
        } else if (isParam(value)) {
            if (isContent(array[index + 1])) {
                objCommand.params[value] = array[index + 1];
            } else if (isParam(array[index + 1]) || index == array.length - 1) {
                objCommand.params[value] = true;
            }
        }
    })
    
    return objCommand;
}

module.exports = {letters, lastLetter, words, lastWord, checkCNPJ, commandToObj};