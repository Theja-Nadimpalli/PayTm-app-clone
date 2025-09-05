
"use client"


interface inputProps{

    label? : string
    type : string
    text : string
    reference? : any
}

export default function InputBox(props:inputProps){

    return <div className="flex flex-col gap-2 text-[16px] font-medium w-full">
        {props.label && <label>{props.label}</label>}
        <input ref={props.reference} type={props.type} placeholder={props.text} className="rounded-md border p-1" />
    </div>



}