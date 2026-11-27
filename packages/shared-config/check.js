const { validate, validateFixed } = require('./index');
const { errors } = validate();
errors.push(...validateFixed());
if (errors.length) { console.error('Invalid configuration: ' + errors.join(', ')); process.exitCode = 1; }
else console.log('Configuration valid');
