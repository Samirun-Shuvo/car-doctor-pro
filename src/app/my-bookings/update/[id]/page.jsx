"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

const Page = ({ params }) => {
  const { data: session } = useSession();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Use environment variable

  // Fetch bookings
  const loadBookings = useCallback(async () => {
    try {
      const response = await fetch(
        `${baseUrl}/my-bookings/api/booking/${params.id}`
      );
      const result = await response.json();
      if (result?.result) {
        setBooking(result.result);
      } else {
        toast.error("Booking details not found!");
      }
    } catch (error) {
      toast.error("Failed to load booking details");
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id, baseUrl]);

  useEffect(() => {
    if (params.id) {
      loadBookings();
    }
  }, [loadBookings, params.id]);

  // Handle form submission for updating the booking
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    const updatedBooking = {
      date: e.target.date.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
    };

    try {
      const res = await fetch(
        `${baseUrl}/my-bookings/api/booking/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedBooking),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        toast.success("Order updated successfully!");
      } else {
        toast.error("Failed to update the order");
      }
    } catch (error) {
      toast.error("Error updating the order");
      console.error("Error during booking update:", error);
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading booking details...</div>;
  }

  // Error or no booking state
  if (!booking) {
    return <div>No booking details found.</div>;
  }

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
            Update Booking
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleUpdateBooking}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  defaultValue={session?.user?.name || ""}
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  readOnly
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date</span>
                </div>
                <input
                  defaultValue={
                    booking.date || new Date().toISOString().split("T")[0]
                  }
                  name="date"
                  type="date"
                  className="input input-bordered w-full"
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
                  defaultValue={session?.user?.email || ""}
                  type="email"
                  name="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  readOnly
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Due Amount</span>
                </div>
                <input
                  defaultValue={booking.price || ""}
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
                  defaultValue={booking.phone || ""}
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
                  defaultValue={booking.address || ""}
                  type="text"
                  name="address"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-6">
            Order Update
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Page;
