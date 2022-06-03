const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

const editTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
}

// tested w/o asyncwrapper middleware
// const Task = require('../models/Task')

// const getAllTasks = async (req, res) => {
//   try{
//     const tasks = await Task.find({})
//     res.status(200).json({ tasks })
//   }catch (error){
//     res.status(500).json({msg:error})
//   }
// }

// const createTask = async (req, res) => {
//     try{
//         const task = await Task.create (req.body)
//         res.status(201).json({ task }) // 201 is successful post request
//     } catch (error){
//         res.status(500).json({msg:error})     // 500 is general server error
//     }
// }

// const getTask = async (req, res) => {
//     try{
//         const { id: taskID } = req.params
//         const task = await Task.findOne({ _id: taskID })
//         if (!task) {
//             return res.status(404).json({msg : `No task with id: $taskID`})
//         }
//         res.status(200).json({ task })
//     }catch (error){
//         res.status(500).json({msg:error})     // 500 is general server error
//     }
// }

// const updateTask = async (req, res) => {

//     try {
//         const { id: taskID } = req.params

//         const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators: true,
//         })

//         if (!task) {
//             return res.status(404).json({msg : `No task with id: $taskID`})
//         }
//         res.status(200).json({ task })
//     } catch (error){
//         res.status(500).json({msg:error})     // 500 is general server error
//     }
// }

// const deleteTask = async (req, res) => {
//     try{
//         const { id: taskID } = req.params
//         const task = await Task.findOneAndDelete({ _id: taskID })
//         if (!task) {
//             return res.status(404).json({msg : `No task with id: $taskID`})
//         }
//         res.status(200).json({ task }) // for postman only
//         // res.status(200).send()
//         // res.status(200).json({task : null, status: 'success'}) //for frontend display
//     }catch (error){
//         res.status(500).json({msg:error})     // 500 is general server error
//     }
// }

// const editTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params

//         const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators: true,
//         })

//         if (!task) {
//             return res.status(404).json({msg : `No task with id: $taskID`})
//         }
//         res.status(200).json({ task })
//     } catch (error){
//         res.status(500).json({msg:error})     // 500 is general server error
//     }
// }

// module.exports = {
//   getAllTasks,
//   createTask,
//   getTask,
//   updateTask,
//   deleteTask,
//   editTask,
// }
