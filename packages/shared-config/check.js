const { validate } = require('./index');
const { errors } = validate();
if (errors.length) { console.error('Invalid configuration: ' + errors.join(', ')); process.exitCode = 1; }
else console.log('Configuration valid');
