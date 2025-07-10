const UserModel = require('../model/user.model')


class UserService{ 
    static async registerUser(name, email, password){
        try{
            const createUser = new UserModel({name, email, password});
            return await createUser.save(); 
        }catch(err){
            throw err;
        }
    }

};

module.exports = UserService;