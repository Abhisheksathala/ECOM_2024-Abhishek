// import { assets } from "../assets/assets";
// import { NavLink, Link } from "react-router-dom";
// import { useState, useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import MADVIRE from "../assets/MADVIRE.jpeg";

// const Navbar = () => {
//   const [active, setActive] = useState("home");
//   const [viable, setViable] = useState(false);
//   const {
//     setShowSearch,
//     GetCartCount,
//     navigate,
//     token,
//     setToken,
//     setCartItems,
//   } = useContext(ShopContext);

//   const logout = () => {
//     setToken("");
//     setCartItems({});
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="flex items-center justify-between py-5 font-medium">
//       <ul className="hidden gap-5 text-sm text-white sm:flex">
//         <NavLink to="/" className="flex flex-col items-center gap-1">
//           <p
//             onClick={() => {
//               setActive("home");
//             }}
//           >
//             Home
//           </p>
//           {active === "home" ? (
//             <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
//           ) : (
//             ""
//           )}
//         </NavLink>
//         <NavLink
//           to="/collection"
//           className="flex flex-col -mt-5 items-center gap-1 justify-center"
//         >
//           <p
//             onClick={() => {
//               setActive("collection");
//             }}
//             className="flex items-center flex-col"
//           >
//             <div>
//               <b>Mad</b>
//             </div>
//             <div>COLLECTION</div>
//           </p>
//           {active === "collection" ? (
//             <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
//           ) : (
//             ""
//           )}
//         </NavLink>
//         <NavLink to="/about" className="flex flex-col items-center gap-1">
//           <p
//             onClick={() => {
//               setActive("about");
//             }}
//           >
//             ABOUT
//           </p>
//           {active === "about" ? (
//             <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
//           ) : (
//             ""
//           )}
//         </NavLink>
//         <NavLink to="/contact" className="flex flex-col items-center gap-1">
//           <p
//             onClick={() => {
//               setActive("contact");
//             }}
//           >
//             CONTACT
//           </p>
//           {active === "contact" ? (
//             <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
//           ) : (
//             ""
//           )}
//         </NavLink>
//       </ul>

//       <Link to={"/"}>
//         {/* <img src={assets.logo} className="w-36" alt="" /> */}
//         <img src={MADVIRE} className="w-[4rem] h-[4rem]" alt="" />
//       </Link>

//       <div className="flex items-center gap-6">
//         <img
//           onClick={() => setShowSearch(true)}
//           src={assets.search_icon}
//           className="w-5 cursor-pointer"
//           alt=""
//         />
//         <div className="relative group">
//           <img
//             onClick={() => (token ? null : navigate("/login"))}
//             src={assets.profile_icon}
//             className="w-5 cursor-pointer"
//             alt=""
//           />

//           {token && (
//             <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
//               <div className="flex flex-col gap-2 px-5 py-3 text-gray-400 w-36 bg-slate-100">
//                 <p
//                   onClick={() => navigate("/profile")}
//                   className="cursor-pointer hover:text-black"
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   className="cursor-pointer hover:text-black"
//                   onClick={() => navigate("/orders")}
//                 >
//                   Orders
//                 </p>
//                 <p className="cursor-pointer hover:text-black" onClick={logout}>
//                   Logout
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//         <Link to="/cart" className="relative">
//           <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
//           <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
//             {GetCartCount()}
//           </p>
//         </Link>
//         <img
//           onClick={() => {
//             setViable(true);
//           }}
//           src={assets.menu_icon}
//           className="w-5 cursor-pointer sm:hidden"
//           alt=""
//         />
//       </div>
//       {/* siderbar menu for small screen */}
//       <div
//         className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
//           viable ? "w-full" : "w-0"
//         }`}
//       >
//         <div className="flex flex-col text-gray-600">
//           <div
//             onClick={() => {
//               setViable(false);
//             }}
//             className="flex items-center gap-4 p-3"
//           >
//             <img
//               src={assets.dropdown_icon}
//               className="h-4 rotate-180 cursor-pointer"
//               alt=""
//             />
//             <p>Back</p>
//           </div>
//           <NavLink
//             onClick={() => {
//               setViable(false);
//             }}
//             className="py-2 pl-6 border"
//             to="/"
//           >
//             home
//           </NavLink>
//           <NavLink
//             onClick={() => {
//               setViable(false);
//             }}
//             className="py-2 pl-6 border"
//             to="/Collection"
//           >
//             Collection
//           </NavLink>
//           <NavLink
//             onClick={() => {
//               setViable(false);
//             }}
//             className="py-2 pl-6 border"
//             to="/about"
//           >
//             about
//           </NavLink>
//           <NavLink
//             onClick={() => {
//               setViable(false);
//             }}
//             className="py-2 pl-6 border"
//             to="/contact"
//           >
//             contact
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "../Context/ShopContext";
import MADVIRE from "../assets/MADVIRE.jpeg";
import gsap from "gsap";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [viable, setViable] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);
  const rightIconsRef = useRef(null);
  const containerRef = useRef(null);

  const {
    setShowSearch,
    GetCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    // Set initial states
    gsap.set(containerRef.current, { width: "0%", opacity: 0 });
    gsap.set(logoRef.current, { scale: 0, opacity: 0 });
    gsap.set(navLinksRef.current, { opacity: 0, x: -30 });
    gsap.set(rightIconsRef.current, { opacity: 0, x: 30 });

    // Hide navbar content initially
    gsap.set(navbarRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      // backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1px solid rgba(255, 255, 255, 0)",
    });

    // Create timeline for sequential animations
    const tl = gsap.timeline();

    // Step 1: Logo pops up first with bounce effect
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.5)",
    })
      // Step 2: Container width expands from 0 to 60%
      .to(
        containerRef.current,
        {
          width: "70%",
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.3",
      )
      // Step 3: Navbar background appears with glass effect
      .to(
        navbarRef.current,
        {
          opacity: 1,
          backdropFilter: "blur(12px)",
          // backgroundColor: "rgba(255, 255, 255, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // Step 4: Links come in with stagger effect
      .to(
        navLinksRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(0.7)",
        },
        "-=0.2",
      )
      .to(
        rightIconsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(0.7)",
        },
        "<",
      );
  }, []);

  // Hover animation for nav links
  const handleNavHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -3 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div className="flex justify-center w-full px-4 py-4">
      <div
        ref={containerRef}
        className="overflow-visible"
        style={{ width: "0%", minWidth: "0px" }}
      >
        <div
          ref={navbarRef}
          className="flex items-center justify-between px-8 py-3 font-medium rounded-full backdrop-blur-sm bg-black/50 border border-white/30 shadow-lg"
          style={{ opacity: 0 }}
        >
          <ul
            ref={navLinksRef}
            className="hidden gap-6 text-sm text-white sm:flex"
          >
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 relative"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              <p
                onClick={() => {
                  setActive("home");
                }}
                className="font-medium hover:text-black transition-colors duration-300"
              >
                Home
              </p>
              {active === "home" && (
                <hr className="w-2/4 border-none h-[2.5px] bg-gray-700 animate-pulse absolute -bottom-1" />
              )}
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1 justify-center relative -mt-4"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              <p
                onClick={() => {
                  setActive("collection");
                }}
                className="flex items-center flex-col hover:text-black transition-colors duration-300"
              >
                <div>
                  <b>Mad</b>
                </div>
                <div>COLLECTION</div>
              </p>
              {active === "collection" && (
                <hr className="w-2/4 border-none h-[2.5px] bg-gray-700 animate-pulse absolute -bottom-1" />
              )}
            </NavLink>
            <NavLink
              to="/about"
              className="flex flex-col items-center gap-1 relative"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              <p
                onClick={() => {
                  setActive("about");
                }}
                className="font-medium hover:text-black transition-colors duration-300"
              >
                ABOUT
              </p>
              {active === "about" && (
                <hr className="w-2/4 border-none h-[2.5px] bg-gray-700 animate-pulse absolute -bottom-1" />
              )}
            </NavLink>
            <NavLink
              to="/contact"
              className="flex flex-col items-center gap-1 relative"
              onMouseEnter={(e) => handleNavHover(e, true)}
              onMouseLeave={(e) => handleNavHover(e, false)}
            >
              <p
                onClick={() => {
                  setActive("contact");
                }}
                className="font-medium hover:text-black transition-colors duration-300"
              >
                CONTACT
              </p>
              {active === "contact" && (
                <hr className="w-2/4 border-none h-[2.5px] bg-gray-700 animate-pulse absolute -bottom-1" />
              )}
            </NavLink>
          </ul>

          <Link to={"/"} ref={logoRef} className="flex-shrink-0">
            <img
              src={MADVIRE}
              className="w-[5rem] h-[5rem] rounded-full object-cover hover:scale-105 transition-transform duration-300 shadow-md"
              alt="logo"
            />
          </Link>

          <div ref={rightIconsRef} className="flex items-center gap-5">
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer hover:scale-110 transition-transform duration-300 hover:opacity-70"
              alt="search"
            />
            <div className="relative group">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                src={assets.profile_icon}
                className="w-5 cursor-pointer hover:scale-110 transition-transform duration-300 hover:opacity-70"
                alt="profile"
              />

              {token && (
                <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
                  <div className="flex flex-col gap-2 px-5 py-3 text-gray-400 w-36 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 animate-slideDown">
                    <p
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer hover:text-black transition-colors duration-200"
                    >
                      My Profile
                    </p>
                    <p
                      className="cursor-pointer hover:text-black transition-colors duration-200"
                      onClick={() => navigate("/orders")}
                    >
                      Orders
                    </p>
                    <p
                      className="cursor-pointer hover:text-black transition-colors duration-200"
                      onClick={logout}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-5 min-w-5 hover:scale-110 transition-transform duration-300 hover:opacity-70"
                alt="cart"
              />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] animate-bounce">
                {GetCartCount()}
              </p>
            </Link>
            <img
              onClick={() => {
                setViable(true);
              }}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden hover:scale-110 transition-transform duration-300"
              alt="menu"
            />
          </div>
        </div>
      </div>

      {/* sidebar menu for small screen */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-black/95 backdrop-blur-md transition-all duration-500 z-50 shadow-xl ${
          viable ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-white">
          <div
            onClick={() => {
              setViable(false);
            }}
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-500 transition-colors duration-200 border-b"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 cursor-pointer"
              alt="back"
            />
            <p className="font-medium">Back</p>
          </div>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-3 pl-6 border-b hover:bg-gray-500 transition-colors duration-200"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-3 pl-6 border-b hover:bg-gray-500 transition-colors duration-200"
            to="/Collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-3 pl-6 border-b hover:bg-gray-500 transition-colors duration-200"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-3 pl-6 border-b hover:bg-gray-500 transition-colors duration-200"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
