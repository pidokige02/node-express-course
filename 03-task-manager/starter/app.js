// console.log('Task Manager App')

const express = require ('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'))
app.use(express.json()) // for handling json formatted request body

// route
// app.get('/hello',(req, res) => (
//    res.send('Task Manager App')
// ))

app.use('/api/v1/tasks',tasks)  // use '/api/v1/tasks' as root router
app.use(notFound);
app.use(errorHandlerMiddleware);

//app.get('/api/v1/tasks)   - get all the tasks
//app.post('/api/v1/tasks)   - create a new tasks
//app.get('/api/v1/tasks/:id)   - get a single task
//app.patch('/api/v1/tasks/:id)   - update task
//app.delete('/api/v1/tasks/:id)   - delete task

// const port = process.env.PORT || 5000;
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


//.env 방법을 적용하기 전에 확인한 code임.

// const port = 3000
// const connectionString =
// 'mongodb+srv://pidokige:feb02pid0204~@nodeexpressproject.6blbnbh.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'


// const start = async () => {
//    try {
//      await connectDB(connectionString);
//      app.listen(port, () =>
//        console.log(`Server is listening on port ${port}...`)
//      );
//    } catch (error) {
//      console.log(error);
//    }
//  };

//  start();
