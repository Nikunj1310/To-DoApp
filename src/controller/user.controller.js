const UserService = require('../services/user.services');
const joi  = require('joi');

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

exports.register = async (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if(error){
            res.status(500).json({message: error.details[0].message});
            return;
        }
        const { name, email, password } = req.body;
        const user = await UserService.registerUser(name, email, password);
        res.status(201).json(
            {
                status: true,
                success: "User has been regitered successfully"
            })
    } catch (err) {
        // res.status(500).json({message: err.message}); This does this:
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: err.message }));
        throw err;
    }
}

exports.login = async (req,res,next)=>{
    try{
        const { error } = loginSchema.validate(req.body);
        if(error){
            res.status(500).json({message: error.details[0].message});
            return;
        }
        const {email, password} = req.body;
        const user = await UserService.loginuser(email, password);
        res.status(201).json({
            status: true,
            success: "User has been logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    }catch(err){
        res.status(500).json({message: err});
        /*This is same as:
        res.status(500);
        res.setHeader('Content-Type','application/json');
        res.send(JSON.stringify(err)) */
        throw err;
    }
}