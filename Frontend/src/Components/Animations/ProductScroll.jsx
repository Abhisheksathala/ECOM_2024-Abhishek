import React from "react";

const ProductInfintScroll = () => {

  const images = Array.from({ length: 10 });

  return (
    <div className="w-full overflow-hidden py-4 mt-4 ">
      <div className="flex w-max animate-[scroll_20s_linear_infinite] gap-4">

        {[...images, ...images].map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[200px] flex-shrink-0 mx-2"
          >
            <img
              src="https://imgs.search.brave.com/MqZMFxa_W8ea1ZW5EcdgndzfSsO-bKpbDYN-GoeTF4s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/eW91cmRlc2lnbnN0/b3JlLmluL3VwbG9h/ZHMveWRzL3Byb2R1/Y3RJbWFnZXMvdGh1/bWIvMTY2Mzk5MDcz/MDQzNjRwbHVzLXNp/emUtdGVlX3dlYnNp/dGUtZmluYWwucG5n"
              alt="product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProductInfintScroll;