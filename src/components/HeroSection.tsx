export function HeroSection() {
  return (
    <section id="home" className="bg-[#211C24] text-white">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col pt-16 md:flex-row items-center gap-12 lg:px-40">
        <div className="flex-1">
          <p className="uppercase text-sm tracking-widest text-[#909090] mb-2">
            Pro. Beyond.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            IPhone 14 <span className="text-purple-400">Pro</span>
          </h1>
          <p className="text-[#909090] mb-6 max-w-md">
            Created to change everything for the better. For everyone.
          </p>
          <button className="bg-[#211C24] border text-white px-6 py-3 rounded-lg font-medium hover:bg-[#9a2ee8] hover:text-black transition">
            Shop Now
          </button>
        </div>

        <div className="flex-1">
          <img
            src="/images/Iphone_Image.svg"
            alt="iPhone 14 Pro"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
