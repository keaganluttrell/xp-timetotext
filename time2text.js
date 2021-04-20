'use strict'

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
    '18': "eightteen",
    '19': "nineteen"
};

const minDict = {
    '0': 'oh',
    '2': 'twenty',
    '3': 'thirty',
    '4': 'fourty',
    '5': 'fifty'
};

function time2text(time) {
    let hr = hourString(time);
    let min = minString(time);
    let sfx = suffix(time);
    console.log(hr, min, sfx);
};

//returns in the morning, in the evening, in the afternoon
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
};

//'08:54'
let hourString = (time) => {
    let hour = Number(time.slice(0, 2));
    if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
    }
    return hourDict[hour];
};

let minString = (time) => {
    let firstDigit = time[3];
    let secondDigit = time[4];
    let string1 = minDict[firstDigit];
    let string2 = hourDict[secondDigit];
    if (firstDigit === '1') {
        return hourDict[time[3] + time[4]];
    }
    if (firstDigit === '0') {
        return 'oh ' + string2;
    }
    return `${string1}-${string2}`;
};

// minString("08:54");
// console.log(minString("08:10"));
// minString("08:04");

time2text("08:54")
time2text("12:13")
time2text("18:10")
time2text("00:05")
// console.log(timeString("08:54"));
// console.log(timeString("00:54"));
// console.log(suffix("18:54"))
// console.log(suffix("12:54"))

module.exports = time2text
