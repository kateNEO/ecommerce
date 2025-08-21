import { useEffect } from 'react';
import { /*RouterProvider*/ Outlet } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { initCart } from './services/sdk/initCart';

export default function App() {
  useEffect(() => {
    initCart();
  }, []);

  return (
    <>
      <Header />
      <div className="mt-[61px] flex-1">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
