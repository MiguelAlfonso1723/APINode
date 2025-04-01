import User from '../models/users.mjs'



async function register(req,res){
    const {mail, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        return res.status(400).json({'state': false, 'message': "Por favor ingresa un correo electrónico válido", 'data': null 
        });
    }

    try{
        const newUser = new User({mail, password});
        const result = await newUser.save()
        return res.status(201).json({'state':true,'data':result})
    }catch(error){
        return res.status(500).json({"state":false,"message":error.message})

    }
}

export default register;