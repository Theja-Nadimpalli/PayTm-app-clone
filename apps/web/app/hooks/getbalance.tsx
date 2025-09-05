"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import {useEffect,useState} from "react"

interface BalanceState {
  balance: number;
  firstname: string;
}


export default function useBalance(){
const [state, setstate] = useState<BalanceState>({
  balance: 0,
  firstname: "",
});
 const navigate=useRouter()


    async function getbalance(){
    try{ 
         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account/balance`,{
    
        headers:{
        Authorization: localStorage.getItem("token")
          }})

        setstate({balance:(response.data as any).balance,firstname : (response.data as any).firstname})
     }catch(err){
         //@ts-ignore
         if (axios.isAxiosError(err)) {
             //@ts-ignore
            const status = err.response?.status;

            //@ts-ignore
            alert(err.response?.data.message || "Something went wrong");
                //@ts-ignore
            if (status === 404 || status === 500) {
            //@ts-ignore
            navigate.push(`/signin`);}
            }else{
                alert("An unexpected error occurred");
                navigate.push(`/signin`)

            }
     }}
    useEffect(()=>{
        getbalance()
    },[])

    return state
}