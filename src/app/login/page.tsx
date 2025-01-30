// import LoginSection from "../sections/login";
import ArtatixLogo from "@/assets/artatix-logo.svg";
import BgLogin from "@/assets/bg-login.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
const LoginSection = dynamic(() => import("@/sections/LoginSection"));

export default function Login() {
  return (
    <div className="flex items-center min-h-screen h-full gap-8">
      <div className="lg:flex items-center rounded-lg justify-center w-full h-full max-w-[40%] m-6 hidden overflow-hidden">
        <Image
          src={BgLogin}
          priority
          className="w-full h-full self-center m-auto"
          width={100}
          height={100}
          alt="avatar"
        />
      </div>

      <div className="flex flex-col gap-6 m-auto">
        <div className="flex justify-center items-center max-w-1/2 lg:hidden">
          <Image
            src={ArtatixLogo}
            alt="artatix-logo"
            width={100}
            height={100}
            className="w-full max-w-1/2 block lg:hidden"
          />
        </div>
        <LoginSection />
      </div>
    </div>
  );
}
