const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}){
    return token = jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {
    async index(req, res){
        const { user, password} = req.body;
        
        const retorno = await User.findOne({where: {user: user}})

        if(!retorno){
            return res.status(400).json({ error: 'User not found' });
        }

        if(!await bcrypt.compareSync(password, retorno.password)){
            return res.status(400).json({ error: 'User not found' });
        }

        return res.send({"logado": retorno.user, token: generateToken({id: retorno.id})});        
    },       

    async store(req, res){
        const { user } = req.body;

        const userRepetido = await User.findOne({where: {user: user}})
        
        if(!userRepetido){
            const password = bcrypt.hashSync(req.body.password, 10);

            const userpront = await User.create({ user, password });

            return res.send({userpront, token: generateToken({id: userpront.id}) });
        }

        return res.json({ error: 'Usuário ja cadastrado'})
    }
};