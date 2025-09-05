import express from "express"
import { string, z } from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import userAuth from "../middlewares/userauth.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

export const userRouter = express.Router()
 const client = new PrismaClient()

const userbody = z.object({

    firstname : z.string(),
    lastname :z.string(),
    M_pin: z.string().length(6),
    email : z.email("should be valid email")
}
)
//creat zod object for updatebody...pending

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth : {
        user : "thejajc123@gmail.com",
        pass : "cfku gqxz lngd fjlv"
    }
   })

userRouter.post("/signup", async (req,res)=>{

    const parsedbody = userbody.safeParse(req.body)

    if(!parsedbody.success){
       
        return res.status(400).json({
            path :parsedbody.error.issues.map(err=>err.path),
            message: parsedbody.error.issues.map(err=>err.message)
        })
        
    }
    try{
    
        
     const user = await client.user.findUnique({
      where: {
       email: parsedbody.data.email
      }
     })
     if(user){
         res.status(409).json({
            message: "user already exists"
        })
     }
     else{
        const hashedpassword = await bcrypt.hash(String(parsedbody.data.M_pin),5)
        
        const user1= await client.user.create({
            data: {
                firstname :parsedbody.data.firstname,
                lastname :parsedbody.data.lastname,
                email: parsedbody.data.email,
                M_pin : hashedpassword,
                verified :false

            }
        })
        
        await client.account.create({
            data:{
                userid: user1.id,
                balance :Math.floor(1+ Math.random() *10000)
            }
        })
        const userid= user1.id
       
        res.status(201).json({
            message:"signup successfull",
            userid :userid,
            email: user1.email
        })
     }
        

    }catch(err){
          res.status(500).json({
            message:"Signup failed. Please try again later."
        })
    }

})

userRouter.post("/verify-account",async (req,res)=>{
    const { userid ,email }= req.body
    const otp = Math.floor(100000 + Math.random() * 900000);
    let user = null
    try{
      user = await client.otp.findUnique({
        where:{
            userid : userid
        }
      })
      if(user){
        await client.otp.update({
            where:{id:user.id},
            data :{ otp : otp , expireAt: new Date(Date.now() + 5 * 60 * 1000)}
        })
      }else{
       const userOtp = await client.otp.create({
            data:{
                otp : otp,
                userid : userid,
                email : email,
                expireAt : new Date(Date.now() + 5 * 60 * 1000)
            }})
        }
        await transporter.sendMail({
        from :"thejajc123@gmail.com",
        to : email,
        subject : "verify your email",
        text : `your otp for verification is ${otp}`
        })
        
        res.status(200).json({
            message : "check your mail for otp",
            userid : userid,
            email : email
        })


    }catch(err){
          console.log(err)
          res.status(500).json({
          message : "Unknown error occured. Try again"
        })
    }
})

userRouter.post("/verify-status", async (req,res)=>{

    const {userid,otp} = req.body

    try{

       const user  = await client.otp.findFirst({
            where :{
                userid : userid,
                otp :otp
            }
        })

        if (!user || user.expireAt.getTime() < Date.now()) {
            return res.json({ message: "Invalid or expired OTP" }) }

        await client.user.update({
            where:{
                id : userid
            },data:{
                verified :true
            }
        })
        await client.otp.delete({where:{
            userid: userid
        }})

        res.status(200).json({
            message :"Your Account Is Verified Successfully"
        })
        }catch(err){
            console.log(err)
            res.status(500).json({
            message : "Unknown error occured. Try again",
            err:err
        })
        }
})

userRouter.post("/signin",async (req,res)=>{

    const {email, M_pin }= req.body

    try{

        const user = await client.user.findUnique({
           where:{
               email : email,
           }
       })
       if(!user){

        return res.status(404).json({message:"user not found"})
       }
       if(!user.verified){
        return res.status(403).json({
            message:"Verify your Account",
            userid: user.id,
            email: email
        })
       }
        const passwordcompare = await bcrypt.compare(M_pin,user.M_pin)
       if(!passwordcompare){
        return res.status(401).json({message:"Incorrect Pin"})
       }
        const userid= user.id
        const token= jwt.sign({userid},process.env.JWT_SECRET as string)
        res.status(200).json({
            message:"signin successfull",
            token : token
        })}
        
    catch(err){

         res.status(500).json({
         message: "Signin failed. Please try again later."});
    }

})

userRouter.put("/",userAuth,async (req,res)=>{
try{
    await client.user.update({
        where:{
            //@ts-ignore
            id : req.userid
        },
        data :req.body
    })
    res.status(200).json({
        message:"successfully updated"
    })
}catch(err){
    res.status(500).json({
        message :"Cannot update. please try again later"
    })
}


})

userRouter.get("/bulk",userAuth,async (req,res)=>{
    
    const filter = req.headers.filter as string

    try{
       const users= await client.user.findMany({
            where: {
    OR: [
      {
        firstname: {
          contains: filter,   // same as regex for substring match
          mode: "insensitive" // optional, for case-insensitive search
        }
      },
      {
        lastname: {
          contains: filter,
          mode: "insensitive"
        }}]} })

        res.status(200).json({users : users.map((x)=>{
           return { firstname : x.firstname,
                    lastname : x.lastname,
                      id:x.id}})
                     })
    }
    catch(err){
        res.status(500).json({
            message:"Please try again later"
        })
    }
})

userRouter.get("/details",userAuth, async(req,res)=>{

    try{
        const user = await client.user.findUnique({

            where:{
                //@ts-ignore
               id : req.headers.userid 
            }
        })

        if(!user){
           return res.status(404).json({message:"user not found"})
        }

        res.status(200).json({firstname :user.firstname,lastname:user.lastname,userid:user.id})
    }catch(err){
        res.status(500).json({
            message:"Unknown error. Please try again later"
        })
    }
})