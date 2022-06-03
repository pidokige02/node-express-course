const express = require('express')
const router = express.Router()

const {
    createProducts,
    getAllProducts,
    getAllProductsStatic,
} = require('../controllers/products')

router.route('/').get(getAllProducts).post(createProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router
