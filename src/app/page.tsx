import Image from "next/image";
import BgLogin from "@/assets/bg-login.svg";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import GoogleIcon from "@/assets/google-icon.svg";
import ArtatixLogo from "@/assets/artatix-logo.svg";

export default function Home() {
  return (
    <div className="flex items-center min-h-screen h-full gap-8">
      <div className="flex items-center rounded-lg justify-center w-full h-full max-w-[40%] m-6 lg:block hidden overflow-hidden">
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
        <div className="flex justify-center items-center max-w-1/2 block md:hidden">
          <Image
            src={ArtatixLogo}
            alt="artatix-logo"
            width={100}
            height={100}
            className="w-full max-w-1/2 block md:hidden"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Welcome Back!</h1>
            <p className="text-sm text-slate-500">
              Sign In to access your dashboard, settings and projects.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" placeholder="Password" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="keep-login" disabled />
              <label
                htmlFor="keep-login"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>

            <Link
              href="/forgot-password"
              className="text-primary text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Button>
              <LogIn className="h-4 w-4 mr-1" />
              Sign In
            </Button>
            <Button variant="outline">
              <Image src={GoogleIcon} alt="google-icon" />
              Sign In with Google
            </Button>
          </div>

          <div className="flex justify-center items-center gap-2">
            <span>Don't have an account? </span>
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
