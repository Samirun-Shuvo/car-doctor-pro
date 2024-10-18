"use client";

import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS is necessary for styling

const Checkout = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState(null); // Initialize with null to avoid undefined errors
  const { _id, title, img, price } = service || {}; // Destructure service object safely

  // Fetch service details based on params.id
  useEffect(() => {
    const loadService = async () => {
      try {
        const fetchedService = await getServicesDetails(params.id);
        setService(fetchedService?.service || {});
      } catch (error) {
        console.error("Failed to fetch service details", error);
      }
    };
    loadService();
  }, [params.id]);

  // Checkout handler
  const handleCheckout = async (e) => {
    e.preventDefault();

    const newBooking = {
      email: data?.user?.email,
      name: data?.user?.name,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
      serviceTitle: title,
      serviceId: _id,
      price: price,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/new-booking`, // Use NEXT_PUBLIC_BASE_URL
        {
          method: "POST",
          body: JSON.stringify(newBooking),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        toast.success("🎉 Order Confirmed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        e.target.reset(); // Reset form after successful submission
      } else {
        throw new Error("Failed to place the order");
      }
    } catch (error) {
      console.error(error);
      toast.error("🚨 Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="container mx-auto">
      {/* Header Section */}
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src="/assets/images/about_us/parts.jpg"
          alt="Service details"
          fill
          sizes="100vw"
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-primary bg-opacity-40">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center px-10">
            Checkout {title}
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleCheckout}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  defaultValue={data?.user?.name}
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date</span>
                </div>
                <input
                  defaultValue={new Date().toISOString().split("T")[0]} // Set current date as default
                  name="date"
                  type="date"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  defaultValue={data?.user?.email}
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Due Amount</span>
                </div>
                <input
                  defaultValue={price}
                  name="price"
                  type="text"
                  className="input input-bordered w-full"
                  readOnly
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Phone</span>
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Present address</span>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-6">
            Order Confirm
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
