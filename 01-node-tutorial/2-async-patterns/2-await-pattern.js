// use option 1 for "promisify"
const { readFile, writeFile } = require('fs')

const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

const start = async () => {
  try {
    const first = await readFilePromise('../content/first.txt', 'utf8')
    const second = await readFilePromise('../content/second.txt', 'utf8')

    await writeFilePromise (
      '../content/result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()

//////////////////////////////////////////////////////////////////
// use option 2
// other way to promisify
// const { readFile, writeFile } = require('fs').promises

// const start = async () => {
//   try {
//     const first = await readFile('../content/first.txt', 'utf8')
//     const second = await readFile('../content/second.txt', 'utf8')

//    await writeFile(
//       '../content/result-mind-grenade.txt',
//       `THIS IS AWESOME : ${first} ${second}`,
//       { flag: 'a' }
//     )
//     console.log(first, second)
//   } catch (error) {
//     console.log(error)
//   }
// }

// start()


//////////////////////////////////////////////////////////////////
// common codes for option 3 and option 4
// const { readFile, writeFile } = require('fs')

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf8', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }

// use option 3
// const start = async () => {
//   try{
//     const fisrt  = await getText("../content/first.txt")
//     console.log(fisrt)
//   } catch(error){
//     console.log(error)
//   }

// }

// start()

//////////////////////////////////////////////////////////////////
// or use option 4
//
// getText('../content/first.txt')
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))
