import { Globe, Truck, Flag } from "lucide-react";

const USPSection = () => {
  return (
    <div className="px-6 py-12 bg-[#0f0f0f] text-white mt-14">
      <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us ?</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* CARD 1 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">🇮🇳 Made in India</h3>
          <p className="text-sm opacity-90">
            Proudly crafted with Indian quality and tradition.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-xl border-2 border-dashed border-gray-300 hover:rotate-1 transition">
          <h3 className="text-xl font-bold mb-2">
            <Globe size={30} /> Worldwide Shipping
          </h3>
          <p className="text-sm">
            Delivering happiness across the globe with fast shipping.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-inner border border-gray-700 hover:-translate-y-2 transition">
          <h3 className="text-xl font-bold mb-2">
            <Truck size={30} /> Made by Indians
          </h3>
          <p className="text-sm opacity-80">
            Designed and created by talented Indian creators.
          </p>
        </div>
      </div>
    </div>
  );
};


export default USPSection