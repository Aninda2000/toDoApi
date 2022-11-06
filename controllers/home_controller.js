const User= require('../models/user');
const jwt = require("jsonwebtoken");

module.exports.register=async function(req,res){
    try {
        console.log(req.body);
        let user=await User.findOne({email:req.body.email});
        console.log(user);
        if(user){
            return res.status(200).json({
                success:'true',
                message:'user already exist!!'
            });
        }else{
            user=await User.create({
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password
            })
            return res.status(201).json({
                success:true,
                user,
                message:'user succesfully created'
            });
        }
    } catch (error) {
        console.log(`Error in creating user*****${error}`);
        return res.status(500).json({
            failure:true,
            message:"Internal server Error!!"
        })
        
    }

}

module.exports.createSession=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email});
        console.log('user', user);
        if(user && user.password==req.body.password){
            return res.json(200, {
              success: true,
              verified: true,
              message: "sign in succesful,  please keep your token safe!",
              data: {
                token: jwt.sign(user.toJSON(), process.env.APP_SECRET, {
                  expiresIn: "1800000",
                }),
              },
            });
        }else{
            return res.json(422, {
                success:true,
                verified:false,
                message: "Invalid username or password",
            });
        }

        
    } catch (error) {
        console.log(`Error in creating-session******${error}`);
        return res.status(500).json({
          failure: true,
          message: "Internal server Error!!",
        });
        
    }
}