// import React from "react";

// const Contact = () => {
//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
//           Contact Forever
//         </h1>
//         <p className="text-center text-lg text-gray-600 mb-8">
//           "Style that Lasts Forever" <br />
//           Your trusted partner in timeless fashion.
//         </p>

//         <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Get in Touch
//           </h2>
//           <p className="text-gray-600 mb-6">
//             We'd love to hear from you! Whether you have a question about our
//             products, pricing, or anything else, our team is ready to answer all
//             your questions.
//           </p>

//           <form className="space-y-4">
//             <div>
//               <label className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="Your Name"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="Your Email"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Message</label>
//               <textarea
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="Your Message"
//                 rows="5"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>

//         <div className="mt-12 text-center">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Connect with Us
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Follow us on our social media platforms for the latest updates and
//             exclusive deals!
//           </p>
//           <div className="flex justify-center space-x-4">
//             <a href="#" className="text-blue-600 hover:text-blue-800">
//               Facebook
//             </a>
//             <a href="#" className="text-blue-600 hover:text-blue-800">
//               Twitter
//             </a>
//             <a href="#" className="text-blue-600 hover:text-blue-800">
//               Instagram
//             </a>
//             <a href="#" className="text-blue-600 hover:text-blue-800">
//               LinkedIn
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;


import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Contact = () => {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const formContainerRef = useRef(null);
  const socialSectionRef = useRef(null);
  const formFieldsRef = useRef([]);
  const buttonRef = useRef(null);
  const socialLinksRef = useRef([]);

  useEffect(() => {
    // Create a timeline for sequential fade-ins
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([
      headingRef.current,
      subHeadingRef.current,
      formContainerRef.current,
      socialSectionRef.current
    ], {
      opacity: 0,
      y: 20
    });

    gsap.set(formFieldsRef.current, {
      opacity: 0,
      x: -20
    });

    gsap.set(buttonRef.current, {
      opacity: 0,
      scale: 0.9
    });

    gsap.set(socialLinksRef.current, {
      opacity: 0,
      y: 10
    });

    // Animate everything in sequence
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(subHeadingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(formContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.2")
    .to(formFieldsRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4")
    .to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.2")
    .to(socialSectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2")
    .to(socialLinksRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  // Add refs to form fields
  const addToFormFieldsRef = (el) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el);
    }
  };

  // Add refs to social links
  const addToSocialLinksRef = (el) => {
    if (el && !socialLinksRef.current.includes(el)) {
      socialLinksRef.current.push(el);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h1 
          ref={headingRef}
          className="text-4xl font-bold text-center text-gray-800 mb-6 opacity-0"
        >
          Contact Forever
        </h1>
        
        <p 
          ref={subHeadingRef}
          className="text-center text-lg text-gray-600 mb-8 opacity-0"
        >
          "Style that Lasts Forever" <br />
          Your trusted partner in timeless fashion.
        </p>

        <div 
          ref={formContainerRef}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg opacity-0"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have a question about our
            products, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>

          <form className="space-y-4">
            <div ref={addToFormFieldsRef}>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div ref={addToFormFieldsRef}>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your Email"
              />
            </div>
            <div ref={addToFormFieldsRef}>
              <label className="block text-gray-700">Message</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your Message"
                rows="5"
              ></textarea>
            </div>
            <button
              ref={buttonRef}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>

        <div 
          ref={socialSectionRef}
          className="mt-12 text-center opacity-0"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Connect with Us
          </h3>
          <p className="text-gray-600 mb-4">
            Follow us on our social media platforms for the latest updates and
            exclusive deals!
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              ref={addToSocialLinksRef}
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:scale-110 inline-block"
            >
              Facebook
            </a>
            <a 
              ref={addToSocialLinksRef}
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:scale-110 inline-block"
            >
              Twitter
            </a>
            <a 
              ref={addToSocialLinksRef}
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:scale-110 inline-block"
            >
              Instagram
            </a>
            <a 
              ref={addToSocialLinksRef}
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:scale-110 inline-block"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;