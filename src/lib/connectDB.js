import { MongoClient, ServerApiVersion } from "mongodb";
import { version } from "react";

let db;
export const connectDb = async () => {
  if (db) return db;
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("car_doctor");
    return db;
  } catch (error) {
    console.log(error);
  }
};
