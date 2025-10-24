// import Logo from "/SignFreePDF.png";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-gray-700 hover:text-gray-900 transition-colors ${
      isActive ? "font-semibold text-blue-600" : ""
    }`;

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const location = useLocation();

  const isActiveHash = (hash: string) => location.hash === hash;

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="w-screen bg-white flex items-center h-13 px-5 shadow-md z-50 text-sm fixed">
      <div className="flex w-full justify-between ">
        <div className="flex justify-center items-center gap-5">
          <Link to="/">
            <div className="max-h-16 max-w-[300px] w-[80px] font-bold text-[15px]">
              SoccsHub
            </div>
          </Link>
          {user?.role === "admin" && (
            <>
              <NavLink to="/add-products" className={navLinkClass}>
                <div className="ml-2 text-[12px] inline-block whitespace-nowrap">
                  Add Products
                </div>
              </NavLink>
              <NavLink to="/list-products" className={navLinkClass}>
                <div className="ml-2 text-[12px] inline-block whitespace-nowrap">
                  List Products
                </div>  
              </NavLink>
            </>
          )}
          <HashLink
            to="/#home"
            className={`text-gray-700 hover:text-gray-900 transition-colors ${
              isActiveHash("#home") ? "font-semibold text-blue-600" : ""
            }`}
            scroll={(el: any) => {
              const yOffset = -52; // height of navbar
              const y =
                el.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }}
          >
            <div className="ml-9 text-[12px] ">Home</div>
          </HashLink>
          <HashLink
            smooth
            to="/#product"
            className={`text-gray-700 hover:text-gray-900 transition-colors ${
              isActiveHash("#product") ? "font-semibold text-blue-600" : ""
            }`}
            scroll={(el: any) => {
              const yOffset = -52; // height of navbar
              const y =
                el.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }}
          >
            <div className="text-[12px] ">Products</div>
          </HashLink>
          <NavLink to="/about" className={navLinkClass}>
            <div className=" text-[12px] ">About</div>
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            <div className=" text-[12px]">Contact</div>
          </NavLink>
        </div>
        <div className="flex items-center text-[12px]">
          <div className="right-0 ">
            <input
              type="search"
              placeholder="Search"
              className="bg-blue-100 px-2 py-1 rounded-2xl text-black font-medium"
            />
          </div>
          <div className="flex gap-2 ml-2">
            <div className="border-r-1 pr-1">
              <i className="fa-regular fa-heart"></i>
              {/* <i className="fa-solid fa-heart"></i> */}
            </div>
            <div className="border-r-1 pr-1">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div>
              {!user ? (
                <button
                  onClick={handleSignIn}
                  className="text-[10px] font-medium"
                >
                  Sign in
                </button>
              ) : (
                <p className="cursor-pointer" onClick={() => logout()}>
                  {user.username}
                </p>
                // <i className="fa-regular fa-user"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
