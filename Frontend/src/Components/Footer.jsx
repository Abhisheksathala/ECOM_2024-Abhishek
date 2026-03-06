// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Footer = () => {
//   const navigate = useNavigate();

//   const handleScrollToPolicy = (e) => {
//     e.preventDefault(); // Prevent the default link behavior
//     const policySection = document.getElementById("ourpolicy");
//     if (policySection) {
//       policySection.scrollIntoView({ behavior: "smooth" });
//     }
//     navigate("/"); // Ensure that it stays on the current route ("/")
//   };

//   return (
//     <footer className="text-gray-700 shadow-sm py-8">
//       <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
//         {/* About Section */}
//         <div>
//           <img src={assets.logo} alt="Forever Logo" />
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
//           <ul>
//             <li className="mb-2">
//               <Link to="/" className="hover:text-white transition-colors">
//                 Home
//               </Link>
//             </li>
//             <li className="mb-2">
//               <Link
//                 to="/delivery"
//                 className="hover:text-white transition-colors"
//               >
//                 Delivery
//               </Link>
//             </li>
//             <li className="mb-2">
//               <Link
//                 to="/contact"
//                 className="hover:text-white transition-colors"
//               >
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <a
//                 href="#ourpolicy"
//                 onClick={handleScrollToPolicy}
//                 className="hover:text-white transition-colors"
//               >
//                 Privacy Policy
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
//           <p className="text-sm">
//             Email: info@example.com
//             <br />
//             Phone: +123 456 7890
//             <br />
//             Address: 123 Street Name, City, Country
//           </p>
//         </div>
//       </div>

//       {/* Bottom Footer */}
//       <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
//         <p>&copy; 2024 Forever. All rights reserved.</p>
//         <div className="flex justify-center space-x-4 mt-2">
//           <Link to="#" className="hover:text-white transition-colors">
//             Facebook
//           </Link>
//           <Link to="#" className="hover:text-white transition-colors">
//             Twitter
//           </Link>
//           <Link to="#" className="hover:text-white transition-colors">
//             Instagram
//           </Link>
//           <Link to="#" className="hover:text-white transition-colors">
//             LinkedIn
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Instagram, Facebook, MessageCircle, Mail } from "lucide-react";

const Footer = () => {

  const rotateRef = useRef(null);
  const footerRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {

    // Footer fade-in animation
    gsap.from(footerRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // Infinite rotating circle
    gsap.to(rotateRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

    // Icons entrance animation
    gsap.from(iconsRef.current, {
      opacity: 1,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out"
    });

  }, []);

  const iconHover = (el) => {
    gsap.to(el, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const iconLeave = (el) => {
    gsap.to(el, {
      scale: 1,
      duration: 0.3
    });
  };

  return (
    <footer ref={footerRef} className="bg-background border-t border-border pt-16 pb-8">

      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">

          {/* Left: Policies */}
          <div>
            <h3 className="font-display text-2xl text-foreground mb-6">
              POLICIES
            </h3>

            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Shipping & Delivery",
                "Returns & Exchange",
                "Track Order",
                "Contact Us"
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Center: Logo */}

          <div className="flex flex-col items-center justify-center">

            <div className="relative">

              <div
                ref={rotateRef}
                className="w-32 h-32 rounded-full border border-border flex items-center justify-center"
              >

                <svg viewBox="0 0 200 200" className="w-full h-full absolute">

                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                  </defs>

                  <text
                    className="fill-muted-foreground text-[14px] uppercase tracking-[6px]"
                    fontFamily="Inter, sans-serif"
                  >
                    <textPath href="#circlePath">
                      • Be Mad • Be Bold • Be You •
                    </textPath>
                  </text>

                </svg>

              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-4xl text-primary">
                  M
                </span>
              </div>

            </div>

            <p className="font-display text-xl text-foreground mt-4 tracking-wider">
              MADVIRA MAN
            </p>

          </div>


          {/* Right: Links + Social */}

          <div>

            <h3 className="font-display text-2xl text-foreground mb-6">
              QUICK LINKS
            </h3>

            <ul className="space-y-3 mb-8">
              {["About Us", "Blogs", "Reviews", "Help"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>


            {/* Social icons */}

            <div className="flex gap-4 mb-8">

              {[MessageCircle, Facebook, Instagram].map((Icon, i) => (

                <a
                  key={i}
                  href="#"
                  ref={(el) => (iconsRef.current[i] = el)}
                  onMouseEnter={(e) => iconHover(e.currentTarget)}
                  onMouseLeave={(e) => iconLeave(e.currentTarget)}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon size={18} />
                </a>

              ))}

            </div>


            <p className="text-muted-foreground text-xs mb-4">
              24/7 Customer Support: +91 98765 43210
            </p>


            {/* Email Subscribe */}

            <div className="flex rounded-lg overflow-hidden border border-border">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none"
              />

              <button className="px-4 bg-primary text-primary-foreground">
                <Mail size={18} />
              </button>

            </div>

          </div>

        </div>


        <div className="border-t border-border mt-12 pt-8 text-center">

          <p className="text-muted-foreground text-xs">
            © 2026 Madvira Man. All rights reserved. Be Mad. Be Bold. Be You.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;