const data = require("./dataset.json");
const mp = new Map();

//function to calculate distance between two points
function distance(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;

  const ans = c * r;
  return Math.round(ans * 100) / 100;
}

//retrieving the currencies of each country
const currencies = data.map((value) => {
  return value.currencies;
});

// creating a map of the currencies
// if a currency is present in other country then we are incrementing the count
// it basically checks a currency is valid in how many countries
for (var i = 0; i < currencies.length; i++) {
  const country = currencies[i];
  for (var j = 0; j < country.length; j++) {
    const currname = country[j].code;
    let val = 0;
    if (mp.has(currname)) {
      val = mp.get(currname);
      mp.set(currname, val + 1);
    } else {
      mp.set(currname, 1);
    }
  }
}

// for (const [key, value] of mp) {
//   console.log(key + " = " + value);
// }

// filter out the countries
// arr will contain latlng, population and name

const arr = data.map((value) => {
  const latlng = value.latlng;
  const pop = value.population;
  const name = value.name;
  const currencies = value.currencies;
  let present = false;
  // if pop of that country is greater than or equal to the given population
  if ((pop) => 57100) {
    //checking if pop this country contains currency which map value is 1;
    for (let i = 0; i < currencies.length; i++) {
      const cuurcode = currencies[i].code;
      const num = mp.get(cuurcode);
      console.log(cuurcode, num);
      if (num === 1) {
        present = true;
        break;
      }
    }
    if (present === true) {
      return { name, latlng, pop };
    }
  }
});
arr.sort(function (a, b) {
  var keyA = a.pop,
    keyB = b.pop;
  // Compare the 2 dates
  if (keyA > keyB) return -1;
  if (keyA < keyB) return 1;
  return 0;
});

// getting top 20 countries from above
let count = 20;
let ind = 0;
let temp = [];
while (count && ind < arr.length) {
  if (arr[ind]) {
    temp.push(arr[ind]);
    count = count - 1;
  }
  ind = ind + 1;
}

for (let i = 0; i < temp.length; i++) {
  console.log(i, temp[i]);
}

//calculating the distance between every point
let result = 0;
for (let i = 0; i < temp.length - 1; i++) {
  for (let j = i + 1; j < temp.length; j++) {
    result =
      result +
      distance(
        temp[i].latlng[0],
        temp[j].latlng[0],
        temp[i].latlng[1],
        temp[j].latlng[1]
      );
  }
}

result = Math.round(result * 100) / 100;
console.log(result);
