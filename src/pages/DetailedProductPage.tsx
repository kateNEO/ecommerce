import Modal from '../components/Modal';
import SwiperModal from '../components/SwiperModal';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/sdk/getProductById';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { getCategories } from '../services/sdk/getCategories';
import { Breadcrumbs } from '../components/Breadcrumbs';
import Button from '../components/button.tsx';
import { addOrRemoveClickFunction } from '../utils/productCard/addOrRemoveClickFunction.ts';
import { getCartById } from '../services/sdk/getCartById.ts';
import { useCartStore } from '../store/cartStore.ts';

export function DetailedProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProjection | null>(null);
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((data) => {
          setProduct(data);
          return getCategories();
        })
        .then(setCategories)
        .catch(console.error);
    }
  }, [id]);
  const currentCart = useCartStore.getState().cartId;
  useEffect(() => {
    let inCartList = [];
    if (currentCart) {
      getCartById(currentCart).then((res) => {
        inCartList = res.body.lineItems;
        const found = inCartList.some((item) => item.productId === id);
        setIsInCart(found);
      });
    }
  }, [currentCart, id]);
  if (!product) return <p className="p-10">Loading product...</p>;

  const currentCategorySlug = product.categories?.[0]?.obj?.slug?.['en-US'];
  const master = product.masterVariant;
  const name = product.name['en-US'];
  const description = product.description?.['en-US'] || 'No description';
  const images = master.images || [];
  const imageUrls = images.map((img) => img.url);
  const price = master.prices?.[0];
  const current = price?.discounted?.value || price?.value;
  const original = price?.discounted ? price?.value : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {currentCategorySlug && categories.length > 0 && (
        <Breadcrumbs
          currentCategorySlug={currentCategorySlug}
          categories={categories}
          productName={product.name['en-US']}
        />
      )}
      <button
        onClick={() => navigate('/catalog')}
        className="mb-6 text-purple-600 hover:underline"
      >
        ← Back to catalog
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 order-1 lg:order-2">
          <Swiper
            navigation={images.length > 1}
            modules={[Navigation]}
            className="w-full max-w-md mx-auto"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img.url}
                  alt={`image-${idx}`}
                  onClick={() => {
                    setCurrentImage(img.url); // добавил модальное окно
                    setIsModalOpen(true);
                  }}
                  className="w-full object-contain max-h-[400px] mx-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4 order-3">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          <div className="text-2xl font-bold text-black">
            ${((current?.centAmount || 0) / 100).toFixed(2)}
            {original && (
              <span className="text-gray-400 line-through ml-4 text-lg">
                ${((original.centAmount || 0) / 100).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed text-sm">{description}</p>

          <Button
            type="button"
            text={isInCart ? 'Remove from cart' : 'Add to cart'}
            className={`mt-4 w-full max-w-[200px] min-w-[100px] mb-6 px-8 py-3 rounded-lg transition font-medium ${
              isInCart
                ? 'bg-white text-black border border-[#9F9F9F]'
                : 'bg-black text-white hover:bg-[#9a2ee8]'
            }`}
            onClick={() => {
              if (id) {
                addOrRemoveClickFunction(id, isInCart, setIsInCart);
              }
            }}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <SwiperModal images={imageUrls} currentImage={currentImage} />
        </Modal>
      )}
    </div>
  );
}
