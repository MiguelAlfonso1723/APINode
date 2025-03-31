import User from '../models/users.mjs'
import jwt from 'jsonwebtoken';

const key = process.env.SECRET;

async function loggin(req, res) {
    const{mail, password} = req.body;
    const userlog = await User.findOne({ mail: mail })
    try{
        if(userlog){
            if(userlog.password == password){
                const token = jwt.sign({
                    sub: 'Token',
                    password,
                    exp: Date.now() + 60 * 10000 //10 minutes of expiration (60000 ms = 1 minute)
                }, key)
                console.log('You access')
                return res.send({token});
            }else{
                return res.status(404).json({ state: false, message: "Password is Wrong", data: null });
            }
        }else{
            return res.status(404).json({ state: false, message: "User Don't Exist", data: null });
        }
        
    }catch(err){
        return res.status(500).json({"state":false,"message":err.message})
    }
    
}

export default loggin;