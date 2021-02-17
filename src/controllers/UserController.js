const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { user, password } = req.body;

        const userpront = await User.create({ user, password });

        return res.json(userpront);
    }
};