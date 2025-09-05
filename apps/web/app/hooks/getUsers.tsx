"use client"


import axios from "axios"
import { useRouter } from "next/navigation"
import {useState,useEffect} from "react"


interface userprops{

    name:string
}
export default function useGetusers(props:userprops){

     
    const [users,setusers]= useState<any>([])

    const navigate = useRouter()

    async function getUsers(){
          try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/bulk`,{headers:{
                Authorization : localStorage.getItem("token"),
                Filter : props.name 
            }})

            setusers((response.data as any).users)        
          }catch(err){
            //@ts-ignore
            if (axios.isAxiosError(err)) {
                //@ts-ignore
                const status = err.response?.status;

                //@ts-ignore
                alert(err.response?.data.message || "Something went wrong");
                
            }else{
                alert("An unexpected error occurred");
                 }
                 navigate.push("/signin")
          }
            
}


    useEffect(()=>{
        getUsers()
    },[props.name])


    return users
}