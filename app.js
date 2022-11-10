const csv2json = require("convert-csv-to-json");

const csvFilePath = "C:\\Users\\Kamil\\OneDrive - Xillio\\Desktop\\harvest_time_report_from2022-10-17to2022-10-23.csv";
const jsonFilePath = "C:\Users\Kamil\OneDrive - Xillio\Desktop\harvest_time_report_from2022-10-17to2022-10-23.json";

csv2json.fieldDelimiter(",").formatValueByType().generateJsonFileFromCsv(csvFilePath);