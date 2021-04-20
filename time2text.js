'use strict'
//'08:54' should be converted to 'eight fifty-four in the morning'

const hourDict = {
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

const minDict = {
    '0': 'oh',
    '2': 'twenty',
    '3': 'thirty',
    '4': 'fourty',
    '5': 'fifty'
}

const specialMin = {
    5: 'five past',
    10: 'ten past',
    15: 'quarter past',
    20: 'twenty past',
    30: 'half past',
    40: 'twenty to',
    45: 'quarter to',
    50: "ten to",
    55: 'five to'
}


function time2text(time) {
    if (time === "24:00" || time === "00:00") {
        return "midnight";
    } else if (time === "12:00") {
        return "noon";
    }

    let isSpecial = minuteCheck(time)
    let hr = hourString(time);
    let min = minString(time);
    let sfx = suffix(time);

    if (isSpecial) {
        if (time.slice(3, 5) > 30) {
            let num = String(Number(time.slice(0, 2)) + 1)
            hr = hourString(num);
            sfx = suffix(num);
        }
        if (hr === 'twelve' && (time.slice(0, 2) === '00' || time.slice(0, 2) === '23')) {
            hr = "midnight"
            sfx = ''
        } else if (hr === 'twelve') {
            hr = "noon"
            sfx = ''
        }
        return `${isSpecial} ${hr} ${sfx}`.trim();
    } else {
        return `${hr} ${min} ${sfx}`.trim();
    }
}

const minuteCheck = (time) => {
    let min = Number(time.slice(3, 5))
    return specialMin[min];
}

let suffix = (time) => {
    if (time === "00:00" || time === "12:00") {
        return ""
    }

    let hour = Number(time.slice(0, 2))

    if (hour < 12) {
        return "in the morning";
    }

    if (hour < 18) {
        return "in the afternoon";
    }

    if (hour <= 23) {
        return "in the evening";
    }
}

let hourString = (time) => {
    let hour = Number(time.slice(0, 2));
    if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
    }
    return hourDict[hour];
}

let minString = (time) => {
    let firstDigit = time[3];
    let secondDigit = time[4];
    let string1 = minDict[firstDigit];
    let string2 = hourDict[secondDigit];
    if (firstDigit === '1') {
        return hourDict[time[3] + time[4]];
    }

    if (firstDigit === '0' && secondDigit === '0') {
        return "o'clock"
    }

    if (firstDigit === '0') {
        return 'oh ' + string2;
    }
    return `${string1}-${string2}`;
}

module.exports = time2text
