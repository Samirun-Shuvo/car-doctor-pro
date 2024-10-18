import { connectDb } from "@/lib/connectDB";
import { services } from "@/lib/services";

export const GET = async () => {
  const db = await connectDb();
  const servicesCollection = db.collection("services");
  try {
    await servicesCollection.deleteMany();
    const res = await servicesCollection.insertMany(services);
    return Response.json({ message: "seeded successfully" });
  } catch (error) {
    console.log(error);
  }
};
