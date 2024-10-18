"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const SocialSignin = () => {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleSocialSignin = (provider) => {
    signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  if (status === "authenticated") {
    router.push("/"); // Redirect to home page when authenticated
  }

  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={() => handleSocialSignin("google")}
        className="btn text-xl"
      >
        <FcGoogle />
      </button>
      <button
        onClick={() => handleSocialSignin("github")}
        className="btn text-xl"
      >
        <BsGithub />
      </button>
    </div>
  );
};

export default SocialSignin;
