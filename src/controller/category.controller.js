const CategoryService = require('../services/category.services');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const categoryCreateSchema = joi.object({
    owner: joi.objectId().required(),
    name: joi.string().required(),
    description: joi.string().optional(),
    color: joi.string().length(7).optional(),
})

const categoryFindSchema = joi.object({
    owner: joi.objectId().required(),
})

const deleteCategorySchema = joi.object({
    owner: joi.objectId().required(),
    id: joi.objectId().required()
})

exports.createCategory = async (req, res, next) => {
    try {

        const { error } = categoryCreateSchema.validate(req.body);
        if (error) {
            res.status(500).json({ message: error.details[0].message });
            return;
        }
        const { owner, name, description, color } = req.body;
        const category = await CategoryService.createCategory(owner, name, description, color);
        res.status(201).json({
            message: "A new category created",
            category,
        })

    } catch (err) {
        if (err.code === 11000) {//checks if an  attempt to make a duplicate was made or not
            res.status(400).json({message:`The category already exists!`})
        } else {
            res.status(500).json({ message: err.message });
            throw err.message;  
        }
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const { error } = categoryFindSchema.validate(req.body);
        if (error) {
            res.status(500).json({ message: error.details[0].message });
            return;
        }
        const { owner } = req.body;
        const categories = await CategoryService.getCategory(owner);
        res.status(201).json({
            message: "Welcome back, your tasks have been fetched successfully",
            categories: categories
        })
    } catch (err) {
        res.status(500).json({ message: err.body || err.message });
        throw err;
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { error } = deleteCategorySchema.validate(req.body);
        if (error) {
            res.status(500).json({ message: error.details[0].message });
            return;
        }
        const { owner, id } = req.body;
        const response = await CategoryService.deleteCategory(owner, id);
        res.status(201).json({
            message: response.message,
            category: response.category,
            tasks: response.tasks,
            taskCount: response.taskCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        throw err;
    }
}

const updateCategorySchema = joi.object({
  owner: joi.objectId().required(),
  id: joi.objectId().required(),
  name: joi.string().required(),
  description: joi.string().optional(),
  color: joi.string().length(7).optional(),
});

exports.updateCategory = async (req, res, next) => {
  try {
    const { error } = updateCategorySchema.validate(req.body);
    if (error) return res.status(500).json({ message: error.details[0].message });

    const { owner, id, name, description, color } = req.body;
    const category = await CategoryService.updateCategory(owner, id, name, description, color);
    res.status(201).json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
    throw err;
  }
};
