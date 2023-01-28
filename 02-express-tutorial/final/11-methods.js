const express = require('express')
const app = express()
let { people } = require('../data')

// static assets
app.use(express.static('../methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json form data is passed to middle ware for json handling
app.use(express.json())

// called from javascript.html
app.get('/api/people', (req, res) => {

  res.status(200).json({ success: true, data: people })
  // below command is working well w/ adjusted transferred data accordingly
  // res.status(200).json({ data: people })
})

// called from javascript.html
// in this case, Content-Type is application/json in http transaction.
app.post('/api/people', (req, res) => {
  const { name } = req.body
  console.log(req.body);
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
  // frontend obtain this value with return value
})

// can test this api w/ postman test tool
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
  // all data is sent back to frontend.
  // Consolidated object array is made via spread operator.
  // pre-existing object 와 new object 가 서로 달라도 consolidate 된다.
})

// index.html 의 action /login 을 가지고 backend 에 있는 아래 함수가 call이 된다.
app.post('/login', (req, res) => {
  // name needs to be matched w/ the name of the input box.
  // currently the name of the input box is the "name", name is key
  const { name } = req.body
  console.log(req.body);
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials')
})

// good sample for put method.
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })

  res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  // fetch wanted date from array
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  // send back wanted data
  return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
