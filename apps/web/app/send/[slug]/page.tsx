"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import InputBox from "../../components/InputBox"


export default function Transfer(){
    const [name,setname]= useState("theja")
    const amount = useRef<HTMLInputElement>(null)
    const router =useRouter()

       const params = useParams<{ slug: string }>()

       const userid = params.slug

       async function getusername(){
       try{
        const response= await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/details`,{
            headers :{
                Authorization : localStorage.getItem("token"),
                userid : userid
            }
        })
            setname((response.data as any).firstname)
       }catch(err){
            return
       }}
        
       useEffect(()=>{
          getusername()
       },[])
     
       async function transfer(){

        try{
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account/transfer`,{
            amount : Number(amount.current!.value),
            to : userid
        },{ 
            headers:{
            Authorization : localStorage.getItem("token")}})

            alert((response.data as any).message)

            if(response.status===200){
                router.push("/dashboard")
            }
        }catch(err){
            //@ts-ignore
            if (axios.isAxiosError(err)) {
              //@ts-ignore
               alert(err.response?.data.message || "Something went wrong");
            }else{
                alert("An unexpected error occurred");
                 }
            }
            router.push("/dashboard")
       }


    return <div className="w-screen min-h-screen bg-slate-400 flex items-center justify-center">

        <div className="flex flex-col bg-white shadow-md border rounded-md gap-3 p-5">
            <div className="font-bold text-black text-3xl" >Send Money</div>

            <div className="flex gap-2">
                <span className="font-bold">To :</span>
                <span className="rounded-full px-2 font-bold bg-black text-white">{name[0]}</span>
                <span className="font-bold">{name}</span>
            </div>
            <InputBox reference={amount} type="text"  text="Enter Amount" />
            <button className="bg-green-500 text-white font-bold rounded-md h-9 cursor-pointer" onClick={transfer}> Transfer Amount</button>

        </div>

    </div>
}