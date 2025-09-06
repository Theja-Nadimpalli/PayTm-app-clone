"use client"
import Topbar from "../components/topbar";
import { useRef, useState,useEffect } from "react";
import InputBox from "../components/InputBox";
import useGetusers from "../hooks/getUsers";
import Usercard from "../components/usercard";
import useBalance from "../hooks/getbalance";




export default function dashboard(){
const[name , setName]= useState<string>("")
const data = useBalance()
const inputref = useRef<HTMLInputElement>(null)
const users = useGetusers({name})


return <div className="flex flex-col">
    <Topbar firstname={data!.firstname} />
    <span className="font-bold mt-16 sm:px-25 px-5">Your Balance {data!.balance}</span>
    <div className="flex gap-4 items-center mb-5 sm:px-25 px-5">
        <InputBox type="text" text="search users" reference={inputref} />
        <div className="rounded-md border p-1 font-medium bg-black text-white cursor-pointer" onClick={()=>{setName(inputref.current?.value || "")}}>Search</div>
    </div>
    {users.map((x:any)=><Usercard key={x.id} firstname={x.firstname} lastname={x.lastname} userid={x.id} />   )}
</div>

}