const csvFilePath = "C:\\Users\\Kamil\\OneDrive - Xillio\\Desktop\\CSVtoJSON docs\\CSV's\\harvest_time_report_from2022-10-31to2022-11-06.csv";
const jsonFilePath = "C:\\Users\\Kamil\\OneDrive - Xillio\\Desktop\\CSVtoJSON docs\\JSON's\\harvest_time_report_from2022-10-31to2022-11-06.json";

const fs = require("fs");
csv = fs.readFileSync(csvFilePath)

let data = csv.toString().split("\n");

const headers = data[0].split(",");
let dataArray = [];

for (let i = 1; i < data.length - 1; i++) { //data.length - 1
  
  let quoteFlag = 0;
  let charsCount = 0;
  let commaFlag = false;
  let dataRowString = '';

  // change ',' to '.' when it's a decimal number
  for (let character of data[i]) {
    if (character === '"' && quoteFlag === 0) { quoteFlag = 1; commaFlag = true; }
    else if (character === '"' && quoteFlag === 1) { quoteFlag = 0; commaFlag = false; charsCount = 0; };
    if(commaFlag) charsCount++;
    if (character === ',' && quoteFlag === 1 && charsCount < 6) character = '.';
    if (character === ',' && quoteFlag === 0) character = '|';
    if (character !== '"') dataRowString += character;
  }

  let jsonProperties = dataRowString.split("|");

  // change dateType format
  for (let j = 0; j < jsonProperties.length - 1; j++) {
    if (j === 0) jsonProperties[j] = new Date(jsonProperties[j]);
    if (jsonProperties[j] === "No") jsonProperties[j] = false;
    if (jsonProperties[j] === "Yes") jsonProperties[j] = true;
    if (j === 6 || j === 15 || j === 16) jsonProperties[j] = jsonProperties[j] * 1;
  }

  // combine headers + values
  if( i !== 0) {
    let headerCount = 0;
    let jsonObject = {};
    for (let j in headers) {
      const header = headers[j];
      jsonObject[header] = jsonProperties[headerCount];
      headerCount++;
    }
    dataArray.push(jsonObject);
  }
}

const json = JSON.stringify(dataArray);
fs.writeFileSync(jsonFilePath, json);