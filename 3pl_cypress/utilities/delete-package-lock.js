const fs = require('fs');
const path = require('path');

const filePath = 'package-lock.json';

fs.unlink(filePath, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('File does not exist.');
    } else {
      console.error('Error occurred while deleting file:', err);
    }
  } else {
    console.log('File deleted successfully.');
  }
});
