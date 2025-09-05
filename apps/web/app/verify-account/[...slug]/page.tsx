"use client"

import { useRef,useEffect, useState } from "react"
import InputBox from "../../components/InputBox"
import { useParams, useRouter } from "next/navigation"
import Button from "../../components/Button"
import axios from "axios"


export default function Verify_Account(){
const otpref = useRef<HTMLInputElement>(null)
const params = useParams<{ slug: string[] }>()

const userid = params.slug[0]
const email_1 = params.slug[1]
const email = email_1!.replace("%40", "@");
console.log("userid from params:", userid);
console.log("email from params:", email);
const [state,setstate]=useState(true)
const router =useRouter()

async function verify(){
  try{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-account`,{
    userid :userid,
    email:email
  })
  alert((response.data as any).message)
}catch(err){
          //@ts-ignore
            if (axios.isAxiosError(err)) {
                //@ts-ignore
                alert(err.response?.data.message || "Something went wrong");
                //@ts-ignore
            }else{
                alert("An unexpected error occurred");
                 }
          router.push("/")
      }
}


async function verifystatus(){
  try{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-status`,{
    userid : userid,
    otp : Number(otpref.current?.value)
  })
  alert((response.data as any).message)
  if(response.status===200){
    router.push("/signin")
  }
  }catch(err){
          //@ts-ignore
            if (axios.isAxiosError(err)) {
                //@ts-ignore
                alert(err.response?.data.message || "Something went wrong");
            }else{
                alert("An unexpected error occurred");
                 }
            router.push("/")
      }
}
useEffect(()=>{

  verify()
},[state])



    return <div className="h-screen w-screen flex items-center justify-center">
                  <div className="flex flex-col gap-3 border rounded-md p-10">
                    <span className="text-3xl font-bold text-center">Verify Your Account</span>
                    <InputBox reference={otpref} type="password" text="Enter Your Otp here" label="Check your mail for otp" />
                    <Button text="Submit" size="md" onClick={verifystatus}/>
                    <Button text="Resend Otp" size="md" onClick={()=>{setstate(x=>!x)}}/>
                  </div>
               </div>
}