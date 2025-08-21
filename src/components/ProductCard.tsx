// import { useState } from 'react';
// import HeartOutline from '../assets/icons/heart-outline.svg?react';
// import HeartFilled from '../assets/icons/heart-filled.svg?react';

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   liked?: boolean;
// };

// export function ProductCard({ name, price, image, liked }: Product) {
//   const [isLiked, setIsLiked] = useState(liked ?? false);
//   return (
//     <div className="relative  bg-[#F6F6F6] rounded-xl px-4 flex flex-col items-center text-center shadow hover:shadow-lg transition h-full">
//       {/* иконка лайка */}
//       <div className="w-full mb-4 mt-4 flex justify-end">
//         <button onClick={() => setIsLiked(!isLiked)}>
//           {isLiked ? (
//             <HeartFilled className="w-6 h-6 text-red-500 transition" />
//           ) : (
//             <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
//           )}
//         </button>
//       </div>
//       {/* изображение товара */}
//       <img src={image} alt={name} className="w-full h-40 object-contain mb-4" />
//       {/* название товара */}
//       <div className="flex flex-col flex-grow justify-between">
//         <h3 className="text-lg font-medium text-gray-800 mb-4 leading-snug  whitespace-pre-line">
//           {name}
//         </h3>
//         {/* цена товара */}
//         <p className="text-lg font-bold mb-3">${price.toFixed(2)}</p>
//       </div>
//       {/* кнопка */}
//       <button className="mt-auto bg-black  text-white w-full max-w-[200px] min-w-[100px] mb-6 px-8 py-3 rounded-lg hover:bg-[#9a2ee8] hover:text-white transition">
//         <span className="whitespace-nowrap">Buy now</span>
//       </button>
//     </div>
//   );
// }
