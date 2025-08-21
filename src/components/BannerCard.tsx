type BannerCardProps = {
  image: string;
  title: string;
  description: string;
  className?: string;
  buttonClassName?: string;
};

export function BannerCard({
  image,
  title,
  description,
  className = '',
  buttonClassName = '',
}: BannerCardProps) {
  return (
    <div className={`p-6 flex flex-col justify-between h-auto ${className}`}>
      <img
        src={image}
        alt={title}
        className="mb-6 object-contain h-full mx-auto"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 pr-6">{description}</p>
      <button
        className={`self-start border border-black text-black py-2 px-8 mb-4 rounded hover:bg-black transition ${buttonClassName}`}
      >
        Shop Now
      </button>
    </div>
  );
}
