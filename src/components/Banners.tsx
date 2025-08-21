import { BannerCard } from './BannerCard';

export function Banners() {
  return (
    <section className="py-12 bg-white">
      <div className="w-full mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <BannerCard
          image="/images/Popular_products.svg"
          title="Popular Products"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          className="bg-white"
          buttonClassName="hover:text-white"
        />
        <BannerCard
          image="/images/Ipad_pro.svg"
          title="iPad Pro"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          className="bg-[#F9F9F9]"
          buttonClassName="hover:text-white"
        />
        <BannerCard
          image="/images/samsung_galaxy.svg"
          title="Samsung Galaxy"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          className="bg-[#EAEAEA]"
          buttonClassName="hover:text-white"
        />
        <BannerCard
          image="/images/Macbook_pro.svg"
          title="Macbook Pro"
          description="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          className="bg-[#2C2C2C] text-white"
          buttonClassName="border-white text-white hover:bg-white hover:text-black"
        />
      </div>
    </section>
  );
}
