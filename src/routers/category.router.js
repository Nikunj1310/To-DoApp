const router = require('express').Router();
const CategoryController = require('../controller/category.controller');

router.post('/createCategory', CategoryController.createCategory);
router.post('/getCategory', CategoryController.getCategory);

module.exports = router;