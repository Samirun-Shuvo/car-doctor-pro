"use client"; // Add this at the very top

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialSignin from "@/components/shared/SocialSignin";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Sign in with credentials provider
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true, // Handle redirection manually
      callbackUrl: path ? path : "/"
    });

    if (res?.error) {
      console.error("Login failed:", res.error);
    } else if (res?.ok) {
      router.push("/"); // Redirect to home page on successful login
    }
  };

  return (
    <div className="container mx-auto lg:px-24 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/assets/images/login/login.svg"
            height={440}
            width={440}
            alt="login"
          />
        </div>
        <div className="border-2 p-12">
          <h6 className="text-3xl font-semibold text-primary text-center mb-12">
            Sign In
          </h6>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <label htmlFor="email">Email</label> <br />
              <input
                className="mt-3 input input-bordered w-full"
                type="email"
                name="email"
                placeholder="your email"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label> <br />
              <input
                className="mt-3 input input-bordered w-full"
                type="password"
                name="password"
                placeholder="your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full my-2">
              Sign In
            </button>
          </form>
          <div>
            <h6 className="text-center my-4">or sign in with</h6>
            <SocialSignin />
            <h6 className="text-center my-4">
              Not have an account?{" "}
              <Link className="text-primary font-semibold" href="/signup">
                Sign up
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
