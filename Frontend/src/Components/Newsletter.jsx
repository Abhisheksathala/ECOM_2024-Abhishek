import React from "react";

const Newsletter = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className=" py-12 px-6 sm:px-12 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Join Our Newsletter
      </h2>
      <p className="text-blue-700 mb-6">
        Subscribe to our newsletter to stay updated on our latest products,
        offers, and news!
      </p>
      <form
        className="flex flex-col sm:flex-row justify-center items-center gap-4"
        onSubmit={onSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-auto px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
