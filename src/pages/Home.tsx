import React, { useEffect, useRef, useState } from "react";
import bannerImages from "../assets/images";
import { NavLink } from "react-router-dom";
import ProductList from "../components/Products/ProductList";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null); // browser setInterval returns number

  // Automatic slide every 3 seconds

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleBannerNav = (clickType: string) => {
    switch (clickType) {
      case "left":
        console.log("left");
        setCurrentIndex(
          (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
        );
        break;
      case "right":
        console.log("right");
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
        break;
    }
    startInterval();
  };

  return (
    <div className="flex flex-col w-full" id="home">
      <section className=" flex h-[500px] ">
        <div className="flex justify-center items-center flex-1">
          <div className="container mx-auto px-6 flex flex-col items-center w-[490px]">
            <h1 className="text-2xl font-semibold">
              Performance Starts from the Ground Up. High-Quality Socks for
              Every Move
              <span className="text-[#00ADB5]"> Every Adventure.</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault(); // prevent default jump
                  const el = document.getElementById("products");
                  if (el) {
                    const yOffset = -52; // navbar height
                    const y =
                      el.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Shop Now
              </a>
              <NavLink to="/about">Learn More</NavLink>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-200 relative flex justify-center items-center overflow-hidden shadow-[2px_0_10px_-2px_rgba(0,0,0,1)]">
          <button
            onClick={() => handleBannerNav("left")}
            className="absolute z-10 left-0 ml-2 text-white transition-transform duration-200 hover:scale-125"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          {bannerImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`h-full w-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <button
            onClick={() => handleBannerNav("right")}
            className="absolute z-10 right-0 mr-2 text-white transition-transform duration-200 hover:scale-125"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
      <section id="product" className="w-full bg-blue-50 p-9">
        <h1 className="font-bold">products</h1>
        <ProductList/>
      </section>
    </div>
  );
}

export default Home;
