const User = require('../model.js/userModel')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

exports.Signup= async(req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body
    
        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"Please Enter All field"
            })
    
        }

        const existinguser = await User.findOne({email})

        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"This email is already resistured with us please login or use another email"
            })
     
        }

        let hashpassword = await bcrypt.hash(password,10)

        const user = await new User ({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashpassword,

        }).save()

        return res.status(200).json({
            success:true,
            message:"User signup success",
            user

        })

    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            success:false,
            message:"Something went wrong while creating registration",

        })
    }



}

exports.signIn=async(req,res)=>{
    try{
        const{email,password}= req.body;
    
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        let user= await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"This user is not registered"
            })

        }

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({
                success:false,
                message:"Password Incorrect"
            })

        }

        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        // const token = await jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'})

        console.log(user)
        
        user = user.toObject();
        
        user.password=undefined;
        console.log(user)

        return res.status(200).json({
            success:true,
            message:"User login success",
            user,
            token
        })



    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Error while login"
        })
    }
}