"use client"

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import {useRef} from "react"
import axios from "axios";

export default function(){
  const M_pin= useRef<HTMLInputElement>(null)
  const email= useRef<HTMLInputElement>(null)
   const navigate = useRouter()
    function signup(){
      navigate.push("/signup")
     }


     async function signin(){

    try{
   const response =  await axios.post<any>(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`,{
        email: email.current?.value,
        M_pin:M_pin.current?.value})

        localStorage.setItem("token",response.data.token)

        alert(response.data.message)
        if(response.status===200){
          navigate.push("/dashboard")
        }
        if(response.status===403){
          navigate.push(`/verify-account/${response.data.userid}/${response.data.email}`)
        }
        }catch(err){
          //@ts-ignore
            if (axios.isAxiosError(err)) {
                //@ts-ignore
                const status = err.response?.status;

                //@ts-ignore
                alert(err.response?.data.message || "Something went wrong");
                //@ts-ignore
                if (status === 403) {
                //@ts-ignore
                navigate.push(`/verify-account/${err.response?.data.userid}/${err.response?.data.email}`);}
            }else{
                alert("An unexpected error occurred");
                 }
      }
  }

    return <div className="h-screen w-screen flex items-center justify-center">
              <div className="flex flex-col gap-3 border rounded-md p-10">
                <span className="text-3xl font-bold text-center">SignIn</span>
                <InputBox reference={email} type="text" text="yourmail@gmail.com" label="Email" />
                <InputBox reference={M_pin} type="password" text="6-digit pin" label="M_pin" />
                <Button onClick={signin} text="signin" size="md" />
                <div className="flex items-center gap-1 justify-between">
                    <span>Don't have an account?</span>
                    <Button onClick={signup} text="signup"/>
                </div>
              </div>
           </div>
}