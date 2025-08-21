import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type SwiperModalProps = {
  images: string[];
  currentImage: string;
};

export default function SwiperModal({
  images,
  currentImage,
}: SwiperModalProps) {
  const initialIndex = images.findIndex((img) => img === currentImage);

  return (
    <Swiper
      navigation
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={1}
      initialSlide={initialIndex >= 0 ? initialIndex : 0}
      className="w-full max-h-[80vh]"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
