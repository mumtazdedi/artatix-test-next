"use client";
import Image from "next/image";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import GoogleIcon from "@/assets/google-icon.svg";
import { useActionState } from "react";
import { signIn } from "@/actions/login-action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/actions/login-schema";

export default function LoginSection() {
  const [signInState, action] = useActionState(signIn, {});

  const form = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
    defaultValues: {
      email: signInState.email,
      password: signInState.password,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = form;

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <form action={action} className="m-auto" onSubmit={handleSubmit(onSubmit)}>
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
            <Input id="email" placeholder="Email" {...register("email")} />
            {formErrors?.email && (
              <p className="text-sm text-red-500">
                {formErrors.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {formErrors?.password && (
              <p className="text-sm text-red-500">
                {formErrors.password?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between flex-row items-center w-full">
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
            className="text-primary text-sm hover:underline w-fit"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit">
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
    </form>
  );
}
