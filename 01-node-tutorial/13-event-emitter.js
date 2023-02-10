// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods
// keep track of the order
// additional arguments
// built-in modules utilize it

// customEmitter.emit('response', 'john', 34)

// customEmitter.emit('response')
customEmitter.on('response', (name, id, age) => {
  console.log(`data recieved user ${name} with id:${id}, age:${age}`)
})

customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

// order is important emit need to be located after .om codes
customEmitter.emit('response', 'john', 34, 60)

customEmitter.emit('response', 'john', 34)

customEmitter.emit('response')
