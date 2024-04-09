var rimraf = require("rimraf")
rimraf.sync("node_modules")

var fs = require('fs');
var dir = 'node_modules';
var response_file = 'api_responses.zip'

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    console.log("Deleted node module"s)
}


