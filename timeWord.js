/** Turn a string of 24h time into words.
 *  You can trust that you'll be given a valid string (it will always have a two-digit hour 00-23 and a two-digit minute 00-59). Hours 0-11 are am, and hours 12-23 are pm.
 */

/**
 * numLookUp will be used to translate hours and minutes from the military time string into words
 */
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


/** 
 * fcn convertHours(hours)
 * Convert military hours string to regular hours string
 * 
 * Input: military hours string of digits (hours)
 * 
 * Returns: regular hours string (newHours)
 * e.g., '00' => '12', '23' => '11', '07' => '07'
 */
function convertHours(hours) {
  hours = +hours;
  // console.log("HOURS from convertHours: ", hours);
  let newHours;
  if (hours === 0 || hours === 12) {
    newHours = 12;
  } else if (hours < 12) {
    newHours = hours;
  } else if (hours > 12) {
    newHours = hours - 12;
  }
  // switch (true) {
  //   case hours === 0:
  //   case hours === 12:
  //     newHours = 12;
  //     break;
  //   case hours < 12:
  //     newHours = hours;
  //     break;
  //   case hours > 12:
  //     newHours = hours - 12;
  //     break;
  // }

  // convert newHours (Number) to a 2-character padded string 
  newHours = newHours.toString().padStart(2, '0');
  // console.log("NEWHOURS: ", newHours);
  return newHours;  // a string of length 2
}

/**
 * fcn hoursToWords(newHours)
 * 
 * Convert regular hours string of two digits to words
 * 
 * Input: 
 *    * hours (military hours string, e.g., '04' or '22') and
 *    * newHours (regular hours string, e.g., '04' or '10')
 * 
 * Returns: hours in words (hoursWord)
 * e.g., hours "00" => "midnight", 
 *       hours "04" => "four", 
 *       hours "12" => "noon"
 */
function hoursToWords(hours, newHours, minutes) {
  // console.log("HOURS: ", hours, "NEWHOURS: ", newHours);
  let hoursWord = numLookUp[newHours];
  if (hours === '00' && minutes === '00') {
      hoursWord = "midnight";
  }
  if (hours === '12' && minutes === '00') {
    hoursWord = "noon";
  }
  // switch (hours) {
  //   case '00':
  //     hoursWord = "midnight";
  //     break;
  //   case "12":
  //     hoursWord = "noon";
  //     break;
  //   default: 
  //     hoursWord = numLookUp[newHours];
  //     break;
  // }
  // console.log("HOURSWORD: ", hoursWord);
  return hoursWord;
}

/**
 * fcn minutesToWords(minutes)
 * 
 * Convert military minutes string of two digits to words 
 * 
 * Input: minutes (2-character long string of digits)
 * 
 * Returns: minutes in words (minutesWord)
 * e.g., "00" => "o'clock", 
 *       "06" => "oh six", 
 *       "12" => "twelve"
 *       "39" => "thirty-nine"
 */
function minutesToWords(hours, minutes) {
  // set initial value for minutesWord (will be undefined for some inputs)
  let minutesWord = numLookUp[minutes];
  // console.log("MINUTESWORD unadj: ", minutesWord);

  // ***************************************
  // ADJUST minutesWord for special cases
  // ***************************************
  // if time is 00:00 or 12:00
  if (+minutes === 0 && (hours === "00" || hours === "12")) {
    minutesWord = "";
  }
  // if minutes numeric value is between 1 and 9 inclusive
  if (+minutes > 0 && +minutes <= 9) {
    minutesWord = "oh " + minutesWord;
  }
  // console.log("MINUTESWORD adj 01 - 09: ", minutesWord);

  // if minutes numeric value is above 20
  if (+minutes > 20) {
    // Break minutes into min1 and min2 such that +min1 + +min2 = +minutes

    // min1 is the first digit (the tens place) of minutes multiplied by 10 and converted back to String, e.g., '35' => '30'
    let min1 = (Number.parseInt(minutes.slice(0, 1), 10) * 10).toString();
    min1Word = numLookUp[min1];

    // min2 is the second digit (the ones place) of minutes padded on the left with a '0' (zero), e.g., '35' => '05'
    let min2 = minutes.slice(1, 2).padStart(2, '0');
    let min2Word;
    if (min2 === "00") {
      min2Word = "";
    } else {
      min2Word = numLookUp[min2];
    }
    minutesWord = min1Word + " " + min2Word;
  }
  return minutesWord;
}


/** 
 * fcn getAmPm
 * 
 * Input military hours string (of digits), e.g. "05" or "12"
 * The fcn returns "AM" or "PM" 
*/ 
function getAmPm(hours, hoursWord) { 
  hours = +hours;
  let meridian = (hours >= 0 && hours < 12) ? "AM" : "PM";
  if (hoursWord === "midnight" || hoursWord === "noon") {
    meridian = "";
  }
  return meridian;
}

/** 
 * fcn timeWord 
 * Input a string that expresses military time
 * The fcn returns 
 */
function timeWord(timeString) {
  // pull off hours and minutes as strings
  const hours = timeString.slice(0, 2);  
  const minutes = timeString.slice(3, 5);

  // convert hours and minutes to words
  const newHours = convertHours(hours);  // string of two digits
  const hoursWord = hoursToWords(hours, newHours, minutes);  // hours in words
  const minutesWord = minutesToWords(hours, minutes); // minutes in words

  // get AM/PM; use military hours as input
  const meridian = getAmPm(hours, hoursWord);  
  
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

