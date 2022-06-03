
const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB

// 아래는 test code 로 동작하는 것 확인을 함.
// 다른 js 에서 require 하면 아래 code 가 호출이되어 DB connection됨.
// const mongoose = require('mongoose')

// const connectionString =
// 'mongodb+srv://pidokige:feb02pid0204~@nodeexpressproject.6blbnbh.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'

// // 03-TASK-MANAGER 은 DATABASE NAME 이고 있으면 접속하고 없으면 만든다
// mongoose.
//     connect(connectionString,{  // 아래의 option 을 추가하니 warning message 가 사리지게 됨
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true} ).
//     then(() => (
//     console.log('CONNECTED TO THE DB...')
// )).catch((err) => console.log(err) )
