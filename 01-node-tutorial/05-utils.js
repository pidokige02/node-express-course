const sayHi = (name) => {
  console.log(`Hello there ${name}`)
}

const sayGoodbye = (name) => {
  console.log(`GoodBye there ${name}`)
}

// export default
module.exports = { sayHi, sayGoodbye }
// module.exports = sayGoodbye
// example for exporting function sayHi
// multiple function can be exported