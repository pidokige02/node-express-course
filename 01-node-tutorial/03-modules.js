// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const { sayHi, sayGoodbye } = require('./05-utils')
// const sayGoodbye = require('./05-utils')

const data = require('./06-alternative-flavor')
require('./07-mind-grenade')

console.log("names", names);
console.log("data", data);
// data are exported from multiple object and get into combined object
console.log("items", data.items);
console.log("singlePerson", data.singlePerson);
// Each field in the object can be accessed respectively.

sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
sayGoodbye('sohyun')
