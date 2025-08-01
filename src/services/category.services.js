const CategoryModel = require('../model/category.model');
const taskModel = require('../model/task.model');

class CategoryService{

    static async createCategory(owner, name, description, color) {
        try {
            const newCategory = new CategoryModel({ owner, name, description, color });
            return await newCategory.save();
        } catch (err) {
            throw err;
        }
    }

    static async getCategory(owner){
        try{
            const category = await CategoryModel.find({owner: owner});
            if(!category || category.length === 0){
                throw new Error('Create Cetgories and get started!');
            }
            console.log(category);
            return category; 
            
        }catch(err){
            throw new Error(err)
        }
    }

    static async deleteCategory(owner, id) {
        try {
            const category = await CategoryModel.findOneAndDelete({ _id: id, owner: owner });
            const tasks = await taskModel.deleteMany({ category: id , owner: owner });
            if (!category) {
                throw new Error('Category not found');
            }
            return { message: 'Category alogn with the tasks deleted successfully',
                category : category,
                tasks: tasks,
                taskCount: tasks.deletedCount
             };
        } catch (err) {
            throw err.message;
        }
    }

}

module.exports = CategoryService;