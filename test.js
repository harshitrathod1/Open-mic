const crypto = require('crypto');

const otp = crypto.randomInt(1000,9999);

console.log(otp);