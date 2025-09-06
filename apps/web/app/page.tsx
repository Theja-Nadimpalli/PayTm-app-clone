
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-[#FCFBFC]">
      {/* Navbar */}
      <div className="flex flex-row justify-between sm:flex-row sm:items-center sm:justify-between px-6 sm:px-12 py-5 gap-4 sm:gap-0 flex-wrap">
        <span className="text-3xl sm:text-4xl font-extrabold">Paytm</span>
        <div className="flex gap-4 flex-wrap">
          <Link href="/" className="font-bold cursor-pointer underline"> Home</Link>
          <Link href="/signup" className="font-bold cursor-pointer underline">Sign Up</Link>
          <Link href="/signin" className="font-bold cursor-pointer underline"> Sign In</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-12 gap-10 mt-10">
        {/* Text Section */}
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold break-words">
            Fast, Secure & Reliable Payments
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl">
            Send money, recharge, pay bills, and shop – all in one place.
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl">
            Join millions who trust Paytm. Get started today!
          </div>
          <Link href="/signup">
            <button className="text-base sm:text-lg lg:text-xl bg-black text-white rounded-md font-bold px-4 py-2 mt-4">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <Image
          src="/Pay_Tm.png"
          alt="pay_Tm"
          width={350}
          height={350}
          className="w-48 sm:w-72 lg:w-[350px] h-auto"
        />
      </div>
    </div>
  );
}
