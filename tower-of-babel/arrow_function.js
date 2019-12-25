var inputs = process.argv.slice(2);
var result = inputs.map(item => item.charAt(0))
    .reduce((prev, curr) => prev + curr);

console.log(result);