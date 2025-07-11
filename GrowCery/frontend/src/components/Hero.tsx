import "boxicons/css/boxicons.min.css";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <main
      className="relative flex lg:mt-20 flex-col lg:flex-row
  items-center justify-between min-h-[calc(90vh-6rem)]"
    >
      <div
        data-aos="fade-right"
        className="max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-0"
      >
        <div
          className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#87ab87]
        shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full"
        >
          <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
            <i className="bx bx-basket"></i>
            INTRODUCING
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
          GROWCERY
        </h1>

        <p
          className="text-base sm:text-lg tracking-wider text-gray-400 min-w-[25rem] 
        max-w-[25rem] lg:max-w-[30rem]"
        >
          <TypeAnimation
            sequence={[
              1000,
              "Fresh groceries delivered to your door.",
              900,
              "Supporting local communities with quality food.",
              900,
              "Farm-fresh produce, fast and easy.",
              900,
              "Your healthy lifestyle starts here.",
              900,
            ]}
            wrapper="span"
            speed={70}
            repeat={Infinity}
          />
        </p>

        <div className="mt-9">
          <a
            className="border border-[#2a2a2a] bg-white text-black py-2 px-4 
            sm:px-5 rounded-full font-semibold  tracking-wider transition-all duration-300 
            hover:bg-[#1a1a1a] hover:text-white"
            href="#"
          >
            Get Started <i className="bx bx-rocket"></i>
          </a>
        </div>
      </div>

      {/* Grocery Image */}
      <img
        data-aos="fade-left"
        src="/model.png"
        className="absolute m-auto left-0 right-0 w-3/4 md:w-[40%] 
        md:top-[10%] lg:top-auto lg:bottom-[8%] lg:left-auto lg:right-[10%] lg:w-[35%]"
      ></img>
    </main>
  );
};

export default Hero;
