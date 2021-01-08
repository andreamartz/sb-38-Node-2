/** Turn a string of 24h time into words.
 *  You can trust thta you'll be given a valid string (it will always have a two-digig hour 00-23 and a two-digit minute 00-59). Hours 0-11 are am, and hours 12-23 are pm.
 */

// Set minutes (NOTE: if minInput is "00", more work is needed)
  // 00: handle separately
  // 01 - 19: use numLookup table
  // 20 - 59: separate into first and second digits
  let numLookUp = { 
    "00": "o' clock",
    "01": "one",
    "02": "two",
    "03": "three",
    "04": "four",
    "05": "five",
    "06": "six",
    "07": "seven",
    "08": "eight",
    "09": "nine",
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "14": "fourteen",
    "15": "fifteen",
    "16": "sixteen",
    "17": "seventeen",
    "18": "eighteen",
    "19": "nineteen",
    "20": "twenty",
    "30": "thirty",
    "40": "forty",
    "50": "fifty"
  };


/** determine AM or PM */
// function convertHours(hours) {
//   hours = +hours;
//   let meridian;
//   let newHours;
//   if (hours === 0) {
//     meridian = "AM";
//     newHours = 12;
//   } else  if (hours > 0 && hours < 12) {
//     meridian = "AM";
//     newHours = hours;
//   } else if (hours === 12) {
//     meridian = "PM";
//     newHours = hours;
//   } else if (hours > 12 && hours <= 23) {
//     meridian = "PM";
//     newHours = hours - 12;
//   }
//   newHours = newHours.toString().padStart(2, '0');
//   return { newHours, meridian };
// }

/** 
 * Convert military hours string (of digits) to regular hours string (of digits)
 */
function convertHours(hours) {
  hours = +hours;
  let newHours;
  if (hours === 0) {
    newHours = 12;
  } else  if (hours > 0 && hours < 12) {
    newHours = hours;
  } else if (hours === 12) {
    newHours = hours;
  } else if (hours > 12 && hours <= 23) {
    newHours = hours - 12;
  }
  // convert newHours (Number) to a 2-character padded string 
  newHours = newHours.toString().padStart(2, '0');
  return newHours;  // a string
}

/** 
 * Input military hours string (of digits); fcn returns "AM" or "PM" 
*/ 
function getAmPm(hours) { 
  hours = +hours;
  meridian = (hours >= 0 && hours < 12) ? "AM" : "PM";
  return meridian;
}

function timeWord(timeString) {
  // pull off hours and minutes
  const hours = timeString.slice(0, 2);  // hours is a string in military hours
  const minutes = timeString.slice(3, 5);

  // convert minutes string of two digits to words
  let minutesWord = numLookUp[minutes];  // minutes is a 2-character string of digits
  if (+minutes > 0 && +minutes <= 9) {
    minutesWord = "oh " + minutesWord;
  } else if (+minutes >= 10 && +minutes <= 20) {
    minutesWord = minutesWord;
  } else if (+minutes > 20) {
    let min1 = (Number.parseInt(minutes.slice(0, 1), 10) * 10).toString();
    min1Word = numLookUp[min1];
    let min2 = minutes.slice(1, 2).padStart(2, '0');
    let min2Word;
    if (min2 === "00") {
      min2Word = "";
    } else {
      min2Word = numLookUp[min2];
    }
    minutesWord = min1Word + " " + min2Word;
  }

  // get meridian and newHours
  const newHours = convertHours(hours);  // newHours is a string in regular hours; hours is a string in military hours
  const meridian = getAmPm(hours);  // hours is in military hours

  // convert the newHours number to words (use numLookup table after first converting number to string of digits)
  const hoursWord = numLookUp[newHours];
  // convert the minutes number to words (similar approach as for hours)

  // use switch cases to take care of output for special cases and then everything else is just the words in order
  
  const result = hoursWord + " " + minutesWord + " " + meridian;
  // return result
  return result;
}

console.log("00:00: ", timeWord("00:00"));  // midnight
console.log("00:12: ", timeWord("00:12"));  // twelve twelve am
console.log("01:00: ", timeWord("01:00"));  // one o'clock am
console.log("06:01: ", timeWord("06:01"));  // six oh one am
console.log("06:10: ", timeWord("06:10"));  // six ten am
console.log("06:18: ", timeWord("06:18"));  // six eighteen am
console.log("06:30: ", timeWord("06:30"));  // six thirty am
console.log("10:34: ", timeWord("10:34"));  // tem thirty four am
console.log("12:00: ", timeWord("12:00"));  // noon
console.log("12:09: ", timeWord("12:09"));  // twelve oh nine pm
console.log("23:23: ", timeWord("23:23"));  // eleven twenty three pm

// ****
// let hrInput_12 = hrInput - 12;
// ****

// Set hour (NOTE: if hrInput is "00" or "12", more work is needed)
// if !(hrInput === "00" || hrInput === "12") use this table

// ****
// let hours_minus_12 = { 
//                     "01": "one",
//                     "02": "two",
//                     "03": "three",
//                     "04": "four",
//                     "05": "five",
//                     "06": "six",
//                     "07": "seven",
//                     "08": "eight",
//                     "09": "nine",
//                     "10": "ten",
//                     "11": "eleven",
//                     };
// let hrOutput = hours_minus_12.hrInput;
// ****



// Set "oh" to be "oh" or null

// Set special cases (i.e., minutes :00, hour 00: or 12:)