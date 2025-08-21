import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authStore } from '../store/store';
import HeartIcon from '../assets/icons/Heart.svg?react';
import CartIcon from '../assets/icons/Cart.svg?react';
import SearchIcon from '../assets/icons/Search_icon.svg?react';
import Logo from '../assets/icons/Logo.svg?react';
import BurgerIcon from '../assets/icons/Burger.svg?react';
import ProfileIcon from '../assets/icons/profile.svg?react';
import { ROUTES } from '../utils/paths.ts';
import { useSearchStore } from '../store/searchStore';
import { useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore.ts';
export function Header() {
  const location = useLocation();
  const isCatalogPage = location.pathname === '/catalog';
  const customer = authStore((state) => state.customer);
  const logout = authStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  const countOfProduct = useCartStore((state) => state.quantity);
  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex justify-between items-center xl:px-40">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-gray-800">
          <Logo />
        </Link>

        <div className="relative w-full max-w-[240px] sm:max-w-[280px]">
          {isCatalogPage && (
            <>
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </>
          )}
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to={ROUTES.HOME} className="hover:text-[#9a2ee8]">
            Home
          </NavLink>
          <NavLink to={ROUTES.CATALOG} className="hover:text-[#9a2ee8]">
            Catalog
          </NavLink>
          <NavLink to={ROUTES.ABOUT} className="hover:text-[#9a2ee8]">
            About Us
          </NavLink>
        </nav>

        <div className="hidden md:flex gap-2 items-center">
          <button className="relative w-6 h-6 ml-2">
            <HeartIcon />
          </button>
          <Link
            to={ROUTES.CART}
            onClick={() => setIsMenuOpen(false)}
            className="relative w-6 h-6"
          >
            <CartIcon />
            {countOfProduct > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                {countOfProduct}
              </span>
            )}
          </Link>
        </div>
        <div className="hidden md:flex gap-4">
          {customer ? (
            <>
              <Link
                to={ROUTES.PROFILE}
                className="flex items-center text-md text-gray-700 font-medium hover:underline"
              >
                <ProfileIcon className="inline w-8 h-7.5" />
                {customer.firstName || 'Profile'}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate(ROUTES.HOME, { replace: true });
                }}
                className="text-md text-gray-700 font-medium hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="text-md text-gray-700 font-medium hover:underline"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="text-md text-gray-700 font-medium hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Бургер кнопка */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden"
        >
          <BurgerIcon className="w-6 h-6 text-gray-900" />
        </button>
      </div>

      {/* Мобильный слайдер меню */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg overflow-hidden transform transition-transform duration-500 ease-in-out z-30 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-6 text-gray-700 font-medium">
          <NavLink
            to={ROUTES.HOME}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#9a2ee8]"
          >
            Home
          </NavLink>
          <NavLink
            to={ROUTES.CATALOG}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#9a2ee8]"
          >
            Catalog
          </NavLink>
          <NavLink
            to={ROUTES.ABOUT}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#9a2ee8]"
          >
            About Us
          </NavLink>
          {customer ? (
            <>
              <Link
                to={ROUTES.PROFILE}
                onClick={() => setIsMenuOpen(false)}
                className="hover:underline mt-4"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate(ROUTES.HOME, { replace: true });
                }}
                className="hover:underline text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                onClick={() => setIsMenuOpen(false)}
                className="hover:underline mt-4"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                onClick={() => setIsMenuOpen(false)}
                className="hover:underline"
              >
                Register
              </Link>
            </>
          )}
          <div className="flex gap-4 pt-4 border-t border-gray-200 mt-4">
            <button className="relative w-6 h-6">
              <HeartIcon />
            </button>
            <Link
              to={ROUTES.CART}
              onClick={() => setIsMenuOpen(false)}
              className="relative w-6 h-6"
            >
              <CartIcon />
              {countOfProduct > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                  {countOfProduct}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      {/* Оверлей мобильного меню мобильного */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
