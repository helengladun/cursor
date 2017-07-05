const max = process.argv[2];

let FizzBuzz = function*(){
  let currNumber = 1;

    while (currNumber <= max) {
      let result;

      if (currNumber % 3 === 0 && currNumber % 5 === 0) {
        result = 'FizzBuzz';
      } else if (currNumber % 3 === 0) {
        result = 'Fizz';
      } else if (currNumber % 5 === 0) {
        result = 'Buzz';
      } else {
        result = currNumber;
      }

      currNumber++;

      yield result;
    }

}();

for (var n of FizzBuzz) {
  console.log(n);
}