import axios from "axios";

export const getServices = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const res = await axios.get(`${baseUrl}/services/api/get-all`);
    return res.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services. Please try again later.");
  }
};

export const getServicesDetails = async (id) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const res = await axios.get(`${baseUrl}/services/api/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    throw new Error("Failed to fetch service details. Please try again later.");
  }
};
