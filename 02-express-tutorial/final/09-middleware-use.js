const express = require('express')
const app = express()
const logger = require('../logger')
const authorize = require('../authorize')
//  req => middleware => res
app.use([logger, authorize]) // for multiple middle ware function

// app.use(logger) // 모든 request 에 logger 가 호출된다
// app.use('/api', logger) // /api 가 포함된 request 에 logger 가 호출된다

// api/home/about/products
app.get('/', (req, res) => {
  res.send('Home')
})

// app.use(logger) // 호출된 아래 모든 request 에 logger 가 호출된다

app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
