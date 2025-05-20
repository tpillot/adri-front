"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Image from "next/image";

type Props = { urls: string[] };

export default function ShopCarousel({ urls }: Props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-visible">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={3}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 40, depth: 150, slideShadows: true }}
        modules={[EffectCoverflow, Autoplay]}
        className="h-[50vh] overflow-visible"
      >
        {urls.map((u, i) => (
          <SwiperSlide
            key={i}
            style={{ width: 320 }}
            className="flex items-center justify-center"
          >
            <Image
              src={u}
              alt={`product-${i}`}
              fill
              priority={i === 0}
              className="object-contain rounded-xl shadow-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
