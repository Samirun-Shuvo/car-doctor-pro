import React from "react";

const Bannner = () => {
  return (
    <div className="container mx-auto">
      <div className="carousel w-full mt-8">
        {banners.map((banner, index) => (
          <div
            key={index}
            id={`slide${index + 1}`} // Dynamically set the id for each slide
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(7,25,82,0.7), rgba(0,0,0,0.3)), url(/assets/images/banner/${
                index + 1
              }.jpg)`,
            }}
            className="carousel-item relative w-full h-[90vh] bg-cover bg-top rounded-xl"
          >
            <div className="h-full w-full flex items-center pl-36 text-white">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold">{banner.title}</h1>
                <p>{banner.description}</p>
                <button className="btn btn-primary mr-4">Discover More</button>
                <button className="btn btn-primary btn-outline">Latest Project</button>
              </div>
            </div>
            <div className="absolute flex justify-between transform bottom-12 right-12">
              <a href={banner.prev} className="btn btn-circle mr-4">
                ❮
              </a>
              <a href={banner.next} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const banners = [
  {
    title: "Affordable Price For Car Servicing",
    description:
      "There are many variations of passages of available, but the majority have suffered alteration in some form",
    next: "#slide2",
    prev: "#slide4",
  },
  {
    title: "Expert Mechanics at Your Service",
    description:
      "Get your car serviced by highly trained mechanics who offer quality repairs and maintenance",
    next: "#slide3",
    prev: "#slide1",
  },
  {
    title: "Top-notch Car Maintenance",
    description:
      "Our service center provides comprehensive care for your vehicle, ensuring it runs smoothly",
    next: "#slide4",
    prev: "#slide2",
  },
  {
    title: "Fast and Reliable Services",
    description:
      "Experience quick and dependable car services at our workshop for all vehicle types",
    next: "#slide1",
    prev: "#slide3",
  },
];

export default Bannner;
