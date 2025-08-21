// import { useState } from 'react';
// import { ProductCard } from './ProductCard';

// type Tab = 'New Arrival' | 'Bestseller' | 'Featured Products';

// const products: Record<
//   Tab,
//   { id: number; name: string; price: number; image: string }[]
// > = {
//   'New Arrival': [
//     {
//       id: 1,
//       name: 'Apple iPhone 14 Pro Max 128GB Deep Purple',
//       price: 900,
//       image: '/images/Iphone14pro.svg',
//     },
//     {
//       id: 2,
//       name: 'Blackmagic Pocket Cinema Camera 6k',
//       price: 2535,
//       image: '/images/Blackmagic_cinema.svg',
//     },
//     {
//       id: 3,
//       name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ',
//       price: 399,
//       image: '/images/Apple_watch.svg',
//     },
//     {
//       id: 4,
//       name: 'AirPods Max Silver Starlight Aluminium ',
//       price: 549,
//       image: '/images/AirPods_max.svg',
//     },
//     {
//       id: 5,
//       name: 'Samsung Galaxy Watch6 Classic 47mm Black',
//       price: 369,
//       image: '/images/Samsung_galaxy_watch.svg',
//     },
//     {
//       id: 6,
//       name: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
//       price: 1799,
//       image: '/images/Galaxy_z_fold.svg',
//     },
//     {
//       id: 7,
//       name: 'Galaxy Buds FE \nGraphite',
//       price: 99.99,
//       image: '/images/Galaxy_buds_fe.svg',
//     },
//     {
//       id: 8,
//       name: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
//       price: 399,
//       image: '/images/Ipad_9.svg',
//     },
//   ],
//   Bestseller: [
//     /*...*/
//   ],
//   'Featured Products': [
//     /*...*/
//   ],
// };

// export function ProductTabs() {
//   const [activeTab, setActiveTab] = useState<Tab>('New Arrival');

//   return (
//     <section id="products" className="py-12 bg-white">
//       <div className="max-w-[1440px] mx-auto px-4 lg:px-40">
//         {/* Вкладки */}
//         <div className="flex gap-6 mb-6 text-sm font-medium">
//           {Object.keys(products).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab as Tab)}
//               className={`pb-2 ${
//                 activeTab === tab
//                   ? 'text-black border-b-2 border-black'
//                   : 'text-gray-500 hover:text-black'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Сетка карточек */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products[activeTab].map((p) => (
//             <ProductCard key={p.id} {...p} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
