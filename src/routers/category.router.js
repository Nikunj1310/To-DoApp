const router = require('express').Router();
const CategoryController = require('../controller/category.controller');

router.post('/createCategory', CategoryController.createCategory);
router.post('/getCategory', CategoryController.getCategory);
router.delete('/deleteCategory', CategoryController.deleteCategory);

module.exports = router;