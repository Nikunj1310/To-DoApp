const UserService = require('../services/user.services');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const successRes = await UserService.registerUser(name, email, password);
        res.status(201).json(
            {
                status: true,
                success:"User has been regitered successfully"
            })
    } catch (err) {
        throw err;
    }
}