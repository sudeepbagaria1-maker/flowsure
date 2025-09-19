const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf8');
console.log('First 100 characters of data.js:');
console.log(data.substring(0, 100));