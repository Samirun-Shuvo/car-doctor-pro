import Image from "next/image";
import React from "react";
import checkoutImage from "../../../../public/assets/images/checkout/checkout.png"; // Assuming the image path is correct
import { getServicesDetails } from "@/services/getServices";
import Link from "next/link";

export const metadata = {
  title: "Service Details",
  description: "Service Details Page",
};

const Page = async ({ params }) => {
  const service = await getServicesDetails(params.id);
  const { _id, service_id, title, img, price, description, facility } =
    service.service;

  return (
    <div className="w-11/12 mx-auto my-10">
      <div>
        {/* Header Section */}
        <div className="relative h-72">
          <Image
            className="absolute h-72 w-full left-0 top-0 object-cover"
            src={img} // Corrected src for the image
            alt="Service details"
            layout="fill" // Adjust to fill the space
            objectFit="cover"
          />
          <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-primary bg-opacity-40">
            <h1 className="text-white text-3xl font-bold flex justify-center items-center px-10">
              Details of {title}
            </h1>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-10 bg-gray-100">
          <h2 className="text-3xl font-bold text-orange-600">{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="my-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Two-Column Grid */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {facility.map((item, index) => (
              <div
                key={index}
                className="bg-rose-100 p-4 border-t-4 border-t-rose-600 rounded-xl"
              >
                <h2 className="text-xl font-bold">{item?.name}</h2>
                <p>{item?.details}</p>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="p-6 bg-gray-100">
            <Image
              className="w-full object-cover h-40"
              src={checkoutImage} // Corrected src for the image
              alt="Checkout"
              layout="responsive"
              width={1920}
              height={1080}
            />
            <div className="flex my-4">
              <h2 className="text-xl font-bold">Price:</h2>
              <p className="text-2xl text-rose-500 ml-2">${price}</p>{" "}
              {/* Fixed className typo */}
            </div>
            {/* Corrected link usage */}
            <Link href={`/checkout/${_id}`}>
              <button className="bg-rose-500 px-3 py-2 rounded-lg mt-2 w-full text-white">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
