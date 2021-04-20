'use strict'

const numbers = {
  '0': '',
  '1': "one",
  '2': "two",
  '3': "three",
  '4': "four",
  '5': "five",
  '6': "six",
  '7': "seven",
  '8': "eight",
  '9': "nine",
  '10': "ten",
  '11': "eleven",
  '12': "twelve",
  '13': "thirteen",
  '14': "fourteen",
  '15': "fifteen",
  '16': "sixteen",
  '17': "seventeen",
  '18': "eighteen",
  '19': "nineteen"
};

const tens = {
  0: '',
  2: 'twenty',
  3: 'thirty',
  4: 'fourty',
  5: 'fifty',
  6: 'sixty',
  7: 'seventy',
  8: 'eighty',
  9: 'ninety',
}

const lengths = {
  3: 'hundred',
  4: 'thousand',
  5: 'thousand',
  6: 'hundred'
}

//"745.00"  --> "seven hundred fourty five dollars"
function money2text(money) {
  let arr = money.split('.');
  let [dollars, cents] = arr;
  let dollarString = getString(dollars);
  let centsString = getString(cents);
  if (cents === "00") {
    centsString = "";
  }
  if (centsString) {
    console.log(dollarString + " dollars and " + centsString + " cents")
    // return dollarString + " and " +centsString
  } else {
    console.log(dollarString + " dollars");
  }
}

function getString(amount) {
  let str = '';

  for (let i = 0; i < amount.length; i++) {
    const length = amount.length - i;
    const current = amount[i];
    if (length == 2 || length == 5) {
      if (current === '1') {
        const next = amount[i + 1];
        str = (str + " " + numbers[current + next] + " " + (lengths[length] || "")).trim();
        i++;
        continue;
      }
      str = (str + " " + tens[current]).trim();
    } else {
      if (current === '0') continue;
      str = (str + " " + (numbers[current] || "") + " " + (lengths[length] || "")).trim();
    }
  }
  return str;
}



module.exports = money2text


money2text("18019.10");
money2text("12000.05");
money2text("13000.42");
money2text("945030.67");
money2text("17.00");