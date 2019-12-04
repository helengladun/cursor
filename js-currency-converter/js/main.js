function customConverterToUah() {
    // setting variables
    var euros = parseInt(prompt('How many euros do you want to convert?', '100')),
        dollars = parseInt(prompt('How many dollars do you want to convert?', '100')),
        eurRate = 29.54,
        usdRate = 26.35,
        output = '';

    // currency convertation
    var eurToUah = mainConverter(euros, eurRate);
    var usdToUah = mainConverter(dollars, usdRate);
    var oneEurToUsd = Number(eurRate/usdRate).toFixed(3);

     if (euros && eurToUah) {
        output = euros + ' euros are equal ' + eurToUah + ' grns, ';
     }

     if (dollars && usdToUah) {
         output = output.concat(dollars + ' dollars are equal ' + usdToUah + ' grns, ');
     }

     if (oneEurToUsd) {
         output = output.concat(' one euro is equal ' +  oneEurToUsd + ' dollars.');
     }

    //result
    alert(output);
}

function mainConverter(currencyNumber, currencyRate) {
    if (typeof currencyNumber === 'number' && typeof currencyNumber === 'number') {
        return currencyNumber * Number(parseFloat(currencyRate).toFixed(2));
    }
    else {
        return null;
    }
}

document.querySelector('.push-to-convert').addEventListener( "click" , customConverterToUah);
