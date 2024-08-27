import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToPolicy = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    const policySection = document.getElementById("ourpolicy");
    if (policySection) {
      policySection.scrollIntoView({ behavior: "smooth" });
    }
    navigate("/"); // Ensure that it stays on the current route ("/")
  };

  return (
    <footer className="text-gray-700 shadow-sm py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <img src={assets.logo} alt="Forever Logo" />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/delivery"
                className="hover:text-white transition-colors"
              >
                Delivery
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href="#ourpolicy"
                onClick={handleScrollToPolicy}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">
            Email: info@example.com
            <br />
            Phone: +123 456 7890
            <br />
            Address: 123 Street Name, City, Country
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>&copy; 2024 Forever. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="#" className="hover:text-white transition-colors">
            Facebook
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Twitter
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            Instagram
          </Link>
          <Link to="#" className="hover:text-white transition-colors">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
