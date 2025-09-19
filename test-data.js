const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf8');
eval(data);
console.log('Sample leads parsed successfully:', sampleLeads.length);