import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import Title from "./../Components/Title";
import ProductItem from "./../Components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, SetCategory] = useState([]);
  const [SUBcategory, SetSUBCategory] = useState([]);

  const toogleCategory = (e) => {
    if (category.includes(e.target.value)) {
      SetCategory(category.filter((item) => item !== e.target.value));
    }

    if (!category.includes(e.target.value)) {
      SetCategory([...category, e.target.value]);
    }

    if (SUBcategory.includes(e.target.value)) {
      SetSUBCategory(SUBcategory.filter((item) => item !== e.target.value));
    }
    if (!SUBcategory.includes(e.target.value)) {
      SetSUBCategory([...SUBcategory, e.target.value]);
    }
  };

  const toogleeSubcategory = (e) => {
    if (SUBcategory.includes(e.target.value)) {
      SetSUBCategory(SUBcategory.filter((item) => item !== e.target.value));
    }
    if (!SUBcategory.includes(e.target.value)) {
      SetSUBCategory([...SUBcategory, e.target.value]);
    }

    if (category.includes(e.target.value)) {
      SetCategory(category.filter((item) => item !== e.target.value));
    }

    if (!category.includes(e.target.value)) {
      SetCategory([...category, e.target.value]);
    }
  };

  const applyFilter = () => {
    let filtered = products;

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (SUBcategory.length > 0) {
      filtered = filtered.filter((item) =>
        SUBcategory.includes(item.subcategory)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, SUBcategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-4 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
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
              <input type="checkbox" value={"Men"} onChange={toogleCategory} />
              men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Women"}
                onChange={toogleCategory}
              />
              women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} onChange={toogleCategory} />
              kids
            </p>
          </div>
        </div>
        {/* sub category */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? " " : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Topwear"}
                onChange={toogleeSubcategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Bottomwear"}
                onChange={toogleeSubcategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Winterwear"}
                onChange={toogleeSubcategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* right div */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title
            text1={"ALL Collections:"}
            text2={products.length > 0 ? products.length : 0}
          />
          {/* sort */}
          <select className="border border-gray-300 text-sm px-2">
            <option value="relevant">relevant</option>
            <option value="low-high">low-high</option>
            <option value="high-low">high-low</option>
          </select>
        </div>
        {/* map product */}
        <div className="grid grid-col md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => {
            return <ProductItem key={index} id={item._id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
