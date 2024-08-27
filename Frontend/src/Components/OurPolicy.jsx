import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div
      className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-6 bg-gray-50 rounded-lg shadow-md"
      id="ourpolicy"
    >
      {/* Free Shipping Policy */}
      <div className="flex flex-col items-center">
        <img
          src={assets.quality_icon}
          className="w-12 mb-4"
          alt="Free Shipping Icon"
        />
        <p className="text-lg font-semibold text-gray-800">Free Shipping</p>
        <p className="text-sm text-gray-600 mb-2">
          We offer free shipping on orders over $50.
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Learn More
        </a>
      </div>

      {/* Easy Returns Policy */}
      <div className="flex flex-col items-center">
        <img
          src={assets.exchange_icon}
          className="w-12 mb-4"
          alt="Easy Returns Icon"
        />
        <p className="text-lg font-semibold text-gray-800">Easy Returns</p>
        <p className="text-sm text-gray-600 mb-2">
          Return or exchange items within 30 days.
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Learn More
        </a>
      </div>

      {/* Secure Payments Policy */}
      <div className="flex flex-col items-center">
        <img
          src={assets.support_img}
          className="w-12 mb-4"
          alt="Secure Payments Icon"
        />
        <p className="text-lg font-semibold text-gray-800">Secure Payments</p>
        <p className="text-sm text-gray-600 mb-2">
          Your payment information is safe with us.
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default OurPolicy;
