var rimraf = require("rimraf")
rimraf.sync("reports")

var fs = require('fs');
var dir = 'reports';
var response_file = 'api_responses.zip'

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    console.log("Deleted former test results from reports folder and add fresh folder")
}


