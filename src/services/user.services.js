const UserModel = require('../model/user.model')


class UserService{ 
    static async registerUser(name, email, password){
        try{
            const createUser = new UserModel({name, email, password});
            return await createUser.save(); 
        }catch(err){
            throw err.message;
        }
    }

    static async loginuser(email, password){
        try{
            const user = await UserModel.findOne({ email: email });
            if(!user){
                throw new Error('User not found');
            }
            const isMatch = await require('bcrypt').compare(password, user.password);
            if(!isMatch){
                throw new Error('Invalid password');
            }
                
            return user; // Return the user object if login is successful
            
        }catch(err){
            throw err.message;
        }
    }
    static async deleteUser(userId){
        try{
            const user = await UserModel.findByIdAndDelete(userId);
            if(!user){
                return false; // User not found
            }
            return true; // User deleted successfully
        }catch(err){
            throw err.message;
        }
    }
};

module.exports = UserService;