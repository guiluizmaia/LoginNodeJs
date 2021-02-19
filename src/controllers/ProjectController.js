const User = require('../models/User');

module.exports={
    async index(req, res){
        const id = req.userId

        const user = await User.findOne({where: {id: id}})

        return res.send({ ok: true, user: {id: user.id, user: user.user}});
    }
}