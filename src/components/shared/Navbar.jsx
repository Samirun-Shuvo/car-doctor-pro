"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "MyBookings", path: "/my-bookings" },
    { title: "Blog", path: "/blog" },
    { title: "Contacts", path: "/contacts" },
  ];

  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <Link
                className="font-semibold hover:text-primary duration-300"
                key={item.path}
                href={item.path}
              >
                {item.title}
              </Link>
            ))}
          </ul>
        </div>

        <Link href="/">
          <Image src="/assets/logo.svg" height={40} width={60} alt="logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              className="font-semibold hover:text-primary duration-300"
              key={item.path}
              href={item.path}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-end">
        <div className="flex items-center space-x-3">
          <IoCartOutline className="text-xl" />
          <IoMdSearch className="text-xl" />
          <a className="btn btn-outline btn-primary px-3">Appointment</a>
          {session?.user?.image && (
            <div>
              <Image
                className="mask mask-circle"
                src={session?.user?.image}
                alt={session?.user?.name}
                height={30}
                width={30}
              />
            </div>
          )}
          {status === "loading" && <h6>Loading...</h6>}
          {status === "unauthenticated" && (
            <Link href="/login" className="btn btn-primary px-6">
              Login
            </Link>
          )}
          {status === "authenticated" && (
            <button
              className="btn btn-primary px-6"
              onClick={() => signOut()}
              aria-label="Logout"
              role="button"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
