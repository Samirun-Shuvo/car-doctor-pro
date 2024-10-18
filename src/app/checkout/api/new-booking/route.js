import { connectDb } from "@/lib/connectDB";

export const POST = async (request) => {
  const newBooking = await request.json();
  const db = await connectDb();
  const bookingCollection = db.collection("bookings");
  try {
    const res = await bookingCollection.insertOne(newBooking);
    return Response.json({ message: "Booked successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Somethimg went wrong" }, { status: 400 });
  }
};
