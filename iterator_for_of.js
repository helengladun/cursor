const max = process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let currNumber = 1;

    return {
      next() {
        if (currNumber > max) {
          return { done: true};
        }

        let result;

        if ( currNumber % 3 === 0 && currNumber % 5 === 0 ) {
          result = 'FizzBuzz';
        } else if ( currNumber % 3 === 0 ) {
          result = 'Fizz';
        } else if (currNumber % 5 === 0 ) {
          result = 'Buzz';
        } else {
          result = currNumber;
        }

        currNumber++;

        return { done: false, value: result }
      }
    }

  }
};

for (var n of FizzBuzz) {
 console.log(n);
}