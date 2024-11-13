import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [viable, setViable] = useState(false);
  const {
    setShowSearch,
    GetCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    setToken('');
    setCartItems({});
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={'/'}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p
            onClick={() => {
              setActive('home');
            }}
          >
            Home
          </p>
          {active === 'home' ? (
            <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
          ) : (
            ''
          )}
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p
            onClick={() => {
              setActive('collection');
            }}
          >
            COLLECTION
          </p>
          {active === 'collection' ? (
            <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
          ) : (
            ''
          )}
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p
            onClick={() => {
              setActive('about');
            }}
          >
            ABOUT
          </p>
          {active === 'about' ? (
            <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
          ) : (
            ''
          )}
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p
            onClick={() => {
              setActive('contact');
            }}
          >
            CONTACT
          </p>
          {active === 'contact' ? (
            <hr className="w-2/4 border-none h-[2.5px] bg-gray-700" />
          ) : (
            ''
          )}
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate('/login'))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />

          {token && (
            <div className="absolute right-0 hidden pt-4 group-hover:block dropdown-menu">
              <div className="flex flex-col gap-2 px-5 py-3 text-gray-400 w-36 bg-slate-100">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate('/orders')}
                >
                  Orders
                </p>
                <p className="cursor-pointer hover:text-black" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {GetCartCount()}
          </p>
        </Link>
        <img
          onClick={() => {
            setViable(true);
          }}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* siderbar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
          viable ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setViable(false);
            }}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 cursor-pointer"
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-2 pl-6 border"
            to="/"
          >
            home
          </NavLink>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-2 pl-6 border"
            to="/Collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-2 pl-6 border"
            to="/about"
          >
            about
          </NavLink>
          <NavLink
            onClick={() => {
              setViable(false);
            }}
            className="py-2 pl-6 border"
            to="/contact"
          >
            contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
