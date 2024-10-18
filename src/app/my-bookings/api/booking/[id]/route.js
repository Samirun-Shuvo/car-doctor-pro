import { connectDb } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

const getBookingCollection = async () => {
  const db = await connectDb();
  return db.collection("bookings");
};

// DELETE Booking
export const DELETE = async (req, { params }) => {
  const bookingCollection = await getBookingCollection();
  try {
    const result = await bookingCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Booking not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Booking deleted successfully", result }), { status: 200 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ message: "Failed to delete booking" }), { status: 500 });
  }
};

// PATCH Booking (Update)
export const PATCH = async (req, { params }) => {
  const bookingCollection = await getBookingCollection();
  try {
    const updateDoc = await req.json();
    const result = await bookingCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateDoc },
      { upsert: false } // Disable upsert unless needed
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Booking not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Booking updated successfully", result }), { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return new Response(JSON.stringify({ message: "Failed to update booking" }), { status: 500 });
  }
};

// GET Booking (View Details)
export const GET = async (req, { params }) => {
  const bookingCollection = await getBookingCollection();
  try {
    const result = await bookingCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Booking not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Booking details retrieved successfully", result }), { status: 200 });
  } catch (error) {
    console.error("Error retrieving booking details:", error);
    return new Response(JSON.stringify({ message: "Failed to retrieve booking details" }), { status: 500 });
  }
};
