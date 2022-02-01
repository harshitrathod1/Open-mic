const validator = require('validator');

const isEmail = validator.isEmail("harshgmail.com");
const isMobilePhone = validator.isMobilePhone("7415");

console.log(isEmail,isMobilePhone);