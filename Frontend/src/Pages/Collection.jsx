import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect } from "react";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? " " : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" value={"Men"} />
              men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Women"} />
              women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} />
              kids
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
