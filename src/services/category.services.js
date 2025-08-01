const CategoryModel = require('../model/category.model');

class CategoryService{

    static async createCategory(owner, name, description) {
        try {
            const newCategory = new CategoryModel({ owner, name, description });
            return await newCategory.save();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async getCategory(owner){
        try{
            const category = await CategoryModel.find({owner: owner});
            if(!category || category.length === 0){
                throw new Error('No categories found for this owner');
            }
            console.log(category);
            return category; 
            
        }catch(err){
            throw new Error(err)
        }
    }

}

module.exports = CategoryService;