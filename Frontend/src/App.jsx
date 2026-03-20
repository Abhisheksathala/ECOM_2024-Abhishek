// import { Routes, Route } from 'react-router-dom';

// import About from './Pages/About';
// import Cart from './Pages/Cart';
// import Collection from './Pages/Collection';
// import Contact from './Pages/Contact';
// import Home from './Pages/Home';
// import Login from './Pages/Login';
// import SignUp from './Pages/SignUp';
// import Orders from './Pages/Orders';
// import PlaceOrder from './Pages/PlaceOrder';
// import Product from './Pages/Product';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
// import SearchBar from './Components/SearchBar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Verify from './Pages/Verify';

// const App = () => {
//   return (
//     <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//       <ToastContainer />
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/collection" element={<Collection />} />
//         <Route path="/product/:productId" element={<Product />} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/verify" element={<Verify />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Newsletter from "./Components/Newsletter";

const About = lazy(() => import("./Pages/About"));
const Cart = lazy(() => import("./Pages/Cart"));
const Collection = lazy(() => import("./Pages/Collection"));
const Contact = lazy(() => import("./Pages/Contact"));
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Orders = lazy(() => import("./Pages/Orders"));
const PlaceOrder = lazy(() => import("./Pages/PlaceOrder"));
const Product = lazy(() => import("./Pages/Product"));
const Verify = lazy(() => import("./Pages/Verify"));

const Navbar = lazy(() => import("./Components/Navbar"));
const Footer = lazy(() => import("./Components/Footer"));
const SearchBar = lazy(() => import("./Components/SearchBar"));

const Profile = lazy(() => import("./Pages/Profile"));

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      <Suspense fallback={<p>Loading...</p>}>
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default App;
