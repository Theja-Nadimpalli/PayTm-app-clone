"use client"

interface buttonProps{

    text:string
    size?: "sm" | "md"
      onClick? : ()=>void
}

export default function Button(props:buttonProps){

    return <>
    <button onClick={props.onClick}
    className={` font-bold bg-black text-white rounded-md ${props.size=="md"? "py-2 w-full text-[18px] mt-2": "p-0.5 text-sm"} cursor-pointer`}> {props.text}</button>
    </>



}