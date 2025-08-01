const CategoryService = require('../services/category.services');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const categoryCreateSchema = joi.object({
    owner: joi.objectId().required(),
    name: joi.string().required(),
    description: joi.string().optional()
})

const categoryFindSchema = joi.object({
    owner: joi.objectId().required(),
})

exports.createCategory = async (req, res, next) => {
    try {   

        const {error} = categoryCreateSchema.validate(req.body);
        if(error){
            res.status(500).json({message: error.details[0].message});
            return;
        }
        const { owner, name, description} = req.body;
        const category = await CategoryService.createCategory(owner, name, description);
        res.status(201).json({
            message: "A new category created",
            category: name,
            description: description
        })

    } catch (err) {
        res.status(500).json({ message: err });
        throw err;
    }
}

exports.getCategory = async (req, res, next) => {
    try{
        const {error} = categoryFindSchema.validate(req.body);
        if(error){
            res.status(500).json({message: error.details[0].message});
            return;
        }
        const { owner } = req.body;
        const categories = await CategoryService.getCategory(owner);
        res.status(201).json({
            message:"Welcome back, your tasks have been fetched successfully",
            categories: categories
        })
    }catch(err){
        res.status(500).json({ message: err.body || err.message });
        throw err;
    }
}