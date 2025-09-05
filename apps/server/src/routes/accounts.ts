
import express from "express"
import userAuth from "../middlewares/userauth.js"
import { PrismaClient } from "@prisma/client"

export const accountRouter = express.Router()
const client = new PrismaClient()


accountRouter.get("/balance",userAuth,async (req,res)=>{
  //@ts-ignore
   const userid = req.userid

   try{
    const user = await client.user.findUnique({
        where :{
            id :userid
        }
    })
    const userAccount= await client.account.findFirst({
        where:{
            userid : userid
        }
    })

    if(!userAccount){
        return res.status(404).json({
            message : "User not found"
        })
    }
    res.status(200).json({
        message:"successfully fetched your balance",
        balance : userAccount.balance,
        firstname:user!.firstname
    })

   }catch(err){
      res.status(500).json({
        message : "unknown error occured. Please try again later"
      })
   }
})

accountRouter.post("/transfer",userAuth,async (req,res)=>{


    const {amount , to}=req.body

    try{
        await client.$transaction(async(x)=>{

            const user = await x.account.findUnique({
                where:{
                    //@ts-ignore
                    userid: req.userid
                }
            })
            if(!user){
                throw new Error("user not found")
            }
            if(user.balance <amount){
              throw new Error("Insufficient balance");
            }
            await x.account.update({
                where:{
                    id:user.id
                },data: { balance: { decrement: amount } }})
            const user2 = await x.account.findUnique({
                where:{
                    userid:to
                }
            })
            if(!user2){
                throw new Error("receiver not found")
            }
            await x.account.update({
                where:{
                    id:user2.id
                },data: { balance: { increment: amount } }})
           return { success: true };
        } )
        res.status(200).json({
            message :"Transaction Successful"
        })
    }catch(err){
        res.status(500).json({message : `transaction failed. ${(err as any).message}`})
    }
})