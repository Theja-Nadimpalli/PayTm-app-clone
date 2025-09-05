"use client"

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import {useRef} from "react"
import axios from "axios";




export default function(){

  const firstname = useRef<HTMLInputElement | null>(null)
  const lastname = useRef<HTMLInputElement | null>(null)
  const email = useRef<HTMLInputElement | null>(null)
  const M_pin = useRef<HTMLInputElement | null>(null)
    const navigate = useRouter()

  function signin(){
  navigate.push("/signin")
  }


  async function signup(){

    try{
   const response =  await axios.post<any>(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`,{
        firstname : firstname.current?.value,
        lastname : lastname.current?.value,
        email: email.current?.value,
        M_pin :M_pin.current?.value})

        alert(response.data.message)
       if(response.status === 201){
          navigate.push(`/verify-account/${response.data.userid}/${response.data.email}`)
       }
        }catch(err){
          //@ts-ignore
       if (axios.isAxiosError(err)) {
        //@ts-ignore
      alert(err.response?.data.message || "Something went wrong");
      //@ts-ignore
        if(err.response.status === 409){
          navigate.push("/signin")
       }
      //@ts-ignore
      console.log(err.response?.data.message);}
      else{
        alert("An unexpected error occurred");
      }
      
   }
      }


   
    return <div className="h-screen w-screen flex items-center justify-center">
              <div className="flex flex-col gap-3 border rounded-md p-10">
                <span className="text-3xl font-bold text-center">SignUp</span>
                <InputBox reference={firstname} type="text" text="firstname" label="FirstName" />
                <InputBox reference={lastname} type="text" text="lastname" label="LastName" />
                <InputBox reference={email} type="text" text="yourmail@gmail.com" label="Email" />
                <InputBox reference={M_pin} type="password" text="Enter your 6-digit pin" label="M_pin" />
                <Button onClick={signup} text="signup" size="md"/>
                <div className="flex items-center gap-1 justify-between">
                    <span>Already have an account?</span>
                    <Button onClick={signin} text="signin"/>
                </div>
              </div>
           </div>
  
}