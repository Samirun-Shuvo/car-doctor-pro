"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // Import axios
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { data: session, status } = useSession();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized loadData function to fetch bookings
  const loadData = useCallback(async () => {
    if (!session?.user?.email) return; // Ensure session is available

    setLoading(true); // Start loading before fetching
    setError(null); // Reset error

    try {
      const response = await axios.get(`/my-bookings/api/${session.user.email}`);
      setMyBookings(response.data?.myBookings || []);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
      toast.error("Error fetching bookings!"); // Display error toast when fetching data fails
    } finally {
      setLoading(false); // Stop loading
    }
  }, [session?.user?.email]);

  // Handle booking deletion with proper error message handling
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/my-bookings/api/booking/${id}`);
      if (response.data?.result?.deletedCount > 0) {
        await loadData(); // Reload bookings after deletion
        toast.success("Booking deleted successfully!");
      } else {
        throw new Error("Failed to delete booking. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking. Please try again later."); // Clear and descriptive error
    }
  };

  // Fetch bookings when the session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      loadData(); // Fetch bookings when session is authenticated
    }
  }, [status, loadData]);

  // Loading and Error UI
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    ); // Replace with spinner
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Display error message
  }

  return (
    <div className="container mx-auto">
      {/* Page Header */}
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src="/assets/images/about_us/parts.jpg"
          alt="Service details"
          fill
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-primary bg-opacity-40">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center px-10">
            My Bookings
          </h1>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="my-12">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.length > 0 ? (
                myBookings.map(({ serviceTitle, _id, date, price }, index) => (
                  <tr key={_id}>
                    <th>{index + 1}</th>
                    <td>{serviceTitle}</td>
                    <td>{price}</td>
                    <td>{date}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <Link href={`/my-bookings/update/${_id}`}>
                          <button className="btn btn-xs btn-primary">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Page;
