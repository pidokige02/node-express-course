const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home Page')
  }
  else if (req.url === '/about') {
    // blocking code to prevent eecution continue
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        console.log(`${i} ${j}`)
      }
    }
    res.end('About Page')
  } else  // adding else to prevent system crash
    res.end('Error Page')
    // sending response make system crash happen
})

server.listen(5000, () => {
  console.log('Server listening on port : 5000....')
})
