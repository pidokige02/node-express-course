const express = require('express')
const path = require('path')

const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

//Every time the app receives a request, it prints the message “LOGGED” to the terminal.
app.use(myLogger)
// setup static and middleware
app.use(express.static('../public'))


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../navbar-app/index.html'))
  // With this command removed, it can render index.html as SSR (server side rendering)
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})
