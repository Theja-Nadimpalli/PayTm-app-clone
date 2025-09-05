
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface req extends Request{
   userid?:any
}


export default function userAuth(req:req,res:Response,next:NextFunction){

const mytoken = req.headers.authorization
if(!mytoken){
    return res.status(401).json({ message: "No token provided" });
}

try{

    const decoded= jwt.verify(mytoken,process.env.JWT_SECRET as string) 

    req.userid = (decoded as JwtPayload).userid

    next()


}catch(err){
  res.status(500).json({message:"Something went wrong. Try again later"})
}

}