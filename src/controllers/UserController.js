const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res){
        const { user, password} = req.body;
        
        const retorno = await User.findOne({where: {user: user}})

        if(!retorno){
            return res.status(400).json({ error: 'User not found' });
        }

        if(bcrypt.compareSync(password, retorno.password)){
            return res.json({"logado": retorno.user});
        }

        return res.status(400).json({ error: 'User not found' });
    },       

    async store(req, res){
        const { user } = req.body;

        const userRepetido = await User.findOne({where: {user: user}})
        
        if(!userRepetido){
            const password = bcrypt.hashSync(req.body.password, 10);

            const userpront = await User.create({ user, password });

            return res.json(userpront);
        }

        return res.json({ error: 'Usuário ja cadastrado'})
    }
};