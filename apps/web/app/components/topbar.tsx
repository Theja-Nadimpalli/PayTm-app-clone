"use client"
import { useRouter } from "next/navigation"
import {useState} from "react"


interface topbarProps{
    firstname :string
}
export default function Topbar(props:topbarProps){
   const navigate = useRouter()

    const [state, setstate] = useState(false)

    function logout(){

      localStorage.setItem("token","")
      navigate.push("/signin")
    }



    return <div className="flex justify-between items-center px-25 fixed py-2 border shadow-black shadow-md w-screen">
        <span className="font-extrabold">PayTm</span>
        <div className="flex gap-2 items-center relative">
            <span className="font-bold">Hello </span>
            <button className="rounded-full border p-1 font-bold cursor-pointer relative hover:bg-black hover:text-white" onClick={()=>setstate(!state)} >{props.firstname}</button>
           {state && (
          <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg p-2">
            <ul className="space-y-2">
              <li className="hover:bg-gray-100 p-2 rounded cursor-pointer text-red-600" onClick={logout}>Logout</li>
            </ul>
          </div>
        )}
        </div>
    </div>



}