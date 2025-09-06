"use client"

import { useRouter } from "next/navigation"

interface usercardProps{

    firstname :string
    lastname:string
    userid : any
    key? : any
}

export default function Usercard(props: usercardProps) {
  const router = useRouter();

  function sendmoney() {
    router.push(`/send/${props.userid}`);
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center my-2  px-5 sm:px-25 ">
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <span className="rounded-full bg-black text-white font-bold px-3 py-1 text-lg">{props.firstname[0]}</span>
        <div className="text-base sm:text-lg font-medium">{props.firstname} {props.lastname}</div>
     </div>

  
      <button
        className="rounded-md bg-black text-white font-bold py-1 px-3 text-sm sm:text-base cursor-pointer hover:bg-slate-700 transition"
        onClick={sendmoney}> Send Money </button>
    </div>
  );
}
