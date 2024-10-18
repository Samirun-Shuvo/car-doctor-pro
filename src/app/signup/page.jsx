"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(""); // Reset any previous errors
    setSuccess(""); // Reset any previous success messages
    setIsSubmitting(true); // Disable button while submitting

    const newUser = {
      name: event.target.name.value.trim(), // Trim input values
      email: event.target.email.value.trim(),
      password: event.target.password.value.trim(),
    };

    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    // Password validation
    if (newUser.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post("/signup/api", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setSuccess("Sign-up successful! You can now sign in.");
        event.target.reset(); // Reset form fields
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after completion
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
            Sign Up
          </h6>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleSignUp}>
            <div className="mb-2">
              <label htmlFor="name">Name</label> <br />
              <input
                name="name"
                className="mt-3 input input-bordered w-full"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label> <br />
              <input
                name="email"
                className="mt-3 input input-bordered w-full"
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label> <br />
              <input
                name="password"
                className="mt-3 input input-bordered w-full"
                type="password"
                placeholder="Your password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full my-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div>
            <h6 className="text-center my-4">or sign in with</h6>
            <div className="flex justify-center items-center space-x-4">
              <button className="btn text-xl">
                <FcGoogle />
              </button>
              <button className="btn text-xl">
                <BsGithub />
              </button>
            </div>
            <h6 className="text-center my-4">
              Already have an account?{" "}
              <Link className="text-primary font-semibold" href="/login">
                Sign in
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
