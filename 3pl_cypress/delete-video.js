var rimraf = require("rimraf")
rimraf.sync("cypress/videos")

var fs = require('fs');
var dir = 'cypress/videos';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    console.log("Deleted videos folder and add fresh folder")
}


