import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser=async(req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,        
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 10)
      })

    try{
        const insertUser = await newUser.save();
        res.status(200).json(insertUser);
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}
export const loginUser=async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email })
        
        // Email not found
        if (user === null) {
          return res.status(401).json({
            title: 'user not found',
            error: 'invalid credentials'
          })
        }

        //incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        //IF ALL IS GOOD create a token and send to frontend
        let token = jwt.sign({ userId: user._id}, 'secretkey');
        res.status(200).json({
            title: 'login sucess',
            token: token
        })

        
    } catch (error) {
        res.status(500).json({title: 'server error',error: error})
    }

} 

export const getUser=async(req,res)=>{
    let token = req.headers.token; //token
    await jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({
        title: 'unauthorized'
        })
        
        //token is valid
        try {
            const user = await User.findOne({ _id: decoded.userId })
            res.status(200).json({
                title: 'user grabbed',
                user: {
                email: user.email,
                name: user.name,
                role: user.role
                }
            })
            
        } catch (error) {
            console.log(error)
        }        
    })
}

export const getUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}