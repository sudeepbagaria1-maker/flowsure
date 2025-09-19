const fs = require('fs');
eval(fs.readFileSync('data.js', 'utf8'));

console.log('Sample lead departments:');
window.sampleLeads.slice(0, 5).forEach((lead, i) => {
  console.log(`${i+1}. ${lead.company} - ${lead.department}`);
});