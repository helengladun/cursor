function customConverterToUah() {
    // setting variables
    var euros = parseInt(prompt('How many euros do you want to convert?', '100')),
        dollars = parseInt(prompt('How many dollars do you want to convert?', '100')),
        eurRate = 29.54,
        usdRate = 26.35,
        output = '';

    // currency convertation
    var EurToUah = mainConverter(euros, eurRate);
    var UsdToUah = mainConverter(dollars, usdRate);
    var OneEurToUsd = Number(eurRate/usdRate).toFixed(3);

     if (euros && EurToUah) {
        output = euros + ' euros are equal ' + EurToUah + ' grns, ';
     }

     if (dollars && UsdToUah) {
         output = output.concat(dollars + ' dollars are equal ' + UsdToUah + ' grns, ');
     }

     if (OneEurToUsd) {
         output = output.concat(' one euro is equal ' +  OneEurToUsd + ' dollars.');
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


