import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Forever
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          "Style that Lasts Forever" <br />
          Your trusted partner in timeless fashion.
        </p>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have a question about our
            products, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Connect with Us
          </h3>
          <p className="text-gray-600 mb-4">
            Follow us on our social media platforms for the latest updates and
            exclusive deals!
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Facebook
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Twitter
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Instagram
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
