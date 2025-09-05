"use client"

import { useRouter } from "next/navigation"

interface usercardProps{

    firstname :string
    lastname:string
    userid : any
    key? : any
}

export default function(props:usercardProps){

    const router =useRouter()

    function sendmoney(){

        router.push(`/send/${props.userid}`)
    }

  

    return <div className="flex justify-between items-center my-2 px-25">
        <div className="flex gap-2">
            <span className="rounded-full bg-black text-white font-bold px-2">{props.firstname[0]}</span>
            <div className="flex gap-2 items-center">{props.firstname} {props.lastname}</div>
        </div>
        <button className="rounded-md bg-black text-white font-bold py-1 px-2 cursor-pointer" onClick={sendmoney}>send money</button>

    </div>
}