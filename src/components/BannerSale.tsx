export function BannerSale() {
  return (
    <section
      className="w-full mx-auto bg-cover bg-center py-34 px-4"
      style={{ backgroundImage: "url('/images/Banner_2_background.png')" }}
    >
      <div className="max-w-[1440px] mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-light">
          Big Summer <span className="font-bold">Sale</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-gray-300">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <button className="mt-8 border px-8 py-2 rounded font-medium hover:bg-[#9a2ee8] hover:text-black transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}
