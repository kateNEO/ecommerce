import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import SwiperModal from './SwiperModal';
import HeartOutline from '../assets/icons/heart-outline.svg?react';
import HeartFilled from '../assets/icons/heart-filled.svg?react';
import { addProductToCart } from '../services/sdk/addToCart';
import Button from './button.tsx';
import { Spinner } from './Spinner.tsx';

export type Product = {
  id?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  price?: string;
  originalPrice?: string;
  liked?: boolean;
  inCart?: boolean;
  loading?: boolean;
};

export function ProductCard({
  id,
  name,
  description,
  imageUrl = '/images/placeholder.png',
  images = [],
  price,
  originalPrice,
  liked = false,
  inCart = false,
  loading = false,
}: Product) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(inCart);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      if (!id) return;
      await addProductToCart(id, 1);
      setIsInCart(true);
    } catch (err) {
      console.error('Cannot add product to cart', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Отображение пустых карточек, если товары загружаются
  if (loading) {
    return (
      <div className="h-[420px] bg-[#F6F6F6] rounded-xl px-4 py-6 shadow animate-pulse flex flex-col gap-3">
        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-10 w-full bg-gray-300 rounded mt-auto"></div>
      </div>
    );
  }

  return (
    <div
      key={id}
      className="h-full relative bg-[#F6F6F6] rounded-xl px-4 flex flex-col
      text-center shadow hover:shadow-lg transition m-0.5"
    >
      {/* Иконка лайка */}
      <div className="w-full pt-4 flex justify-end">
        <button onClick={() => setIsLiked(!isLiked)} className="p-1 -mr-1">
          {isLiked ? (
            <HeartFilled className="w-6 h-6 text-red-500 transition" />
          ) : (
            <HeartOutline className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
          )}
        </button>
      </div>

      {/* Картинка */}
      <div
        className="w-full h-40 mb-4 flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-contain p-4 cursor-pointer"
        />
      </div>

      {/* Название и описание */}
      <Link to={`/products/${id}`} className="no-underline">
        <div className="flex flex-col items-center w-full min-h-[120px] flex-grow">
          <h3 className="text-lg font-medium text-gray-800 mb-2 leading-snug line-clamp-2 min-h-[3rem]">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2.5rem]">
              {description}
            </p>
          )}

          {/* Цена и старая цена */}
          <div className="mt-auto">
            {originalPrice && originalPrice !== 'undefined' && (
              <span className="text-sm line-through text-gray-400 mr-2">
                ${originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-black">${price}</span>
          </div>
        </div>
      </Link>
      {isLoading ? (
        // Ожидаем добавление товара в корзину из каталога
        <button
          type="button"
          disabled
          className="mt-4 w-full max-w-[200px] min-w-[100px] mb-6 mx-auto px-8 py-3 rounded-lg transition font-medium bg-white text-black flex justify-center items-center gap-2"
        >
          <Spinner />
          <span>Adding...</span>
        </button>
      ) : (
        // Отображение кнопки добавления товара в корзину
        <Button
          type="button"
          disabled={isInCart}
          text={isInCart ? 'In cart' : 'Add to cart'}
          className={`mt-4 w-full max-w-[200px] min-w-[100px] mb-6 mx-auto px-8 py-3 rounded-lg transition font-medium ${
            isInCart
              ? 'bg-white text-black'
              : 'bg-black text-white hover:bg-[#9a2ee8]'
          }`}
          onClick={handleAddToCart}
        />
      )}
      {/* Модалка со слайдером */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SwiperModal images={images} currentImage={imageUrl} />
        </Modal>
      )}
    </div>
  );
}
