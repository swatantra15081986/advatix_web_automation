var fs = require('fs');
var dir = './cypress/cucumber-json';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
