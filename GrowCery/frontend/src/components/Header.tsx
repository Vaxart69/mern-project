import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";

const Header = () => {
  // Function to toggle mobile menu visibility

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");
    if (!mobileMenu) return;

    

    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  };
  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-10">
      <h1
        data-aos="fade-down"
        className="text-3xl md:text-4xl lg:text-5xl font-medium m-0"
      >
        GROWCERY 🌿
      </h1>

      {/* Desktop Navigation */}

      <nav className="hidden md:flex items-center gap-12">
        <a
          data-aos="fade-down"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="#"
        >
          PRODUCTS
        </a>

        <a
          data-aos="fade-down"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="#"
        >
          ABOUT
        </a>

        <a
          data-aos="fade-down"
          className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          href="#"
        >
          CONTACT
        </a>
      </nav>

      <Link
        to="/signin"
        className="hidden md:block bg-white text-black py-2 px-8 rounded-full border-none 
      font-medium transition-all duration-500 hover:bg-[#a7a7a7] cursor-pointer z-50"
      >
        SIGN IN
      </Link>

      {/* Mobile Menu Button */}

      <button
        data-aos="fade-down"
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl p-2 z-50"
      >
        <i className="bx bx-menu"></i>
      </button>

      {/* Mobile Menu - Hidden by default */}
      <div
        id="mobileMenu"
        className="hidden fixed top-16 left-0 right-0 bottom-0 p-5 md:hidden z-40 bg-black/70 backdrop-blur-md"
      >
        <nav className="flex flex-col gap-6 items-center">
          <a
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
            href="#"
          >
            PRODUCTS
          </a>

          <a
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
            href="#"
          >
            ABOUT
          </a>

          <a
            className="text-base tracking-wider transition-colors hover:text-gray-300 z-50"
            href="#"
          >
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
