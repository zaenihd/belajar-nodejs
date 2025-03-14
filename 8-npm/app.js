const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('zaeni@gmail.com'));
console.log(validator.isMobilePhone('6281212313', 'id-ID'));

console.log(chalk.blue.bgBlue.bold.italic("hello world"));
const pesan = chalk`hi zezen ku {bgRed zaeni}`
console.log(pesan);