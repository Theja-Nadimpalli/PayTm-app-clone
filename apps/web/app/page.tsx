
import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";



export default function Home() {
    


  return <div className="w-screen min-h-screen bg-[#FCFBFC]">

      <div className="flex items-center justify-between px-25 py-5">
        <span className="text-4xl font-extrabold"> Paytm</span>
        <div className="flex gap-4">
          <Link href="/" className="font-bold cursor-pointer underline" > Home </Link>
          <Link href="/signup" className="font-bold cursor-pointer underline" > Sign Up </Link>
          <Link href="/signin" className="font-bold cursor-pointer underline" > Sign In </Link>
        </div>
      </div>
      <div className="flex justify-between items-center px-25 gap-20 mt-10">
        <div className="flex flex-col gap-4">
          <div className="text-6xl font-extrabold break-words">Fast, Secure & Reliable Payments</div>
          <div className="text-2xl">Send money, recharge, pay bills, and shop – all in one place.</div>
          <div className="text-2xl">Join millions who trust Paytm. Get started today!</div>
           <Link href="/signup"><button className="text-xl bg-black text-white rounded-md font-bold px-3 py-1 cursor-pointer">Sign Up</button></Link> 
        </div>
        <Image src="/Pay_Tm.png" alt="pay_Tm" width={350} height={350} />
      </div>
       
  </div>
}
