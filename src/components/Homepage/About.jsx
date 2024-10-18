import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="text-slate-900 my-14 h-full lg:h-screen">
      <div className="container mx-auto py-10">
        {/* Flex container for the image and text */}
        <div className="flex flex-col-reverse lg:flex-row justify-start gap-16 items-start">
          {/* Main background image */}
          <div
            className="relative w-[90%] h-[400px]  rounded-lg shadow-lg"
            style={{
              backgroundImage: `url('/assets/images/about_us/person.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "start",
            }}
          >
            {/* Secondary image positioned on bottom-right corner */}
            <div className="absolute -bottom-12 -right-12 w-[280px] h-[280px]  border-4 border-white rounded-lg shadow-lg">
              <Image
                src="/assets/images/about_us/parts.jpg"
                alt="Parts Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* About Us text content */}
          <div className="">
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-[#FF3811]">
              About Us
            </h2>
            <h2 className="text-4xl font-bold mb-8">
              We are qualified & of experience in this field
            </h2>
            <p className="text-base sm:text-lg ">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apost look even
              slightly believable.
            </p>
            <p className="text-base sm:text-lg mt-8">
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which don&apost look even slightly
              believable.{" "}
            </p>
            <button className="btn btn-primary mt-12">Get More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
