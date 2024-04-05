var fs = require('fs');
var dir = './reports';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
