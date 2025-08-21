import { useRef } from 'react';
import { CategoryItem } from './CategoryItem';
import PhoneIcon from '../assets/icons/Phones.svg?react';
import WatchIcon from '../assets/icons/Smart_Watches.svg?react';
import CameraIcon from '../assets/icons/Cameras.svg?react';
import HeadphoneIcon from '../assets/icons/Headphones.svg?react';
import ComprutersIcon from '../assets/icons/Computers.svg?react';
import GamingIcon from '../assets/icons/Gaming.svg?react';
import ArrowLeft from '../assets/icons/Arrow-left.svg?react';
import ArrowRight from '../assets/icons/Arrow-rigth.svg?react';

const categories = [
  { label: 'Phones', icon: <PhoneIcon className="w-full h-full" /> },
  { label: 'Smart Watches', icon: <WatchIcon className="w-full h-full" /> },
  { label: 'Cameras', icon: <CameraIcon className="w-full h-full" /> },
  { label: 'Headphones', icon: <HeadphoneIcon className="w-full h-full" /> },
  { label: 'Computers', icon: <ComprutersIcon className="w-full h-full" /> },
  { label: 'Gaming', icon: <GamingIcon className="w-full h-full" /> },
];

export function CategorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Browse By Category</h2>

          <div className="flex gap-2 md:hidden">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full hover:bg-gray-100 active:bg-gray-300 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full hover:bg-gray-100 active:bg-gray-300 flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 justify-between overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((c) => (
            <div key={c.label} className="flex-shrink-0 min-w-[120px]">
              <CategoryItem label={c.label} icon={c.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
