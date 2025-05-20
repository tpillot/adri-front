"use client";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import Image from "next/image";
import { API_URL } from "@/lib/api";

type Props = { images: string[] };

export default function StudioCarousel({ images }: Props) {
  if (!images.length)
    return <p className="text-center text-gray-400">Aucune photo studio.</p>;

  return (
    <>
      <Swiper
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        loop
        navigation
        coverflowEffect={{ rotate: 50, depth: 150, slideShadows: true }}
        modules={[EffectCoverflow, Navigation]}
        className="w-full h-[80vh]"
        style={{ "--swiper-navigation-size": "18px" } as React.CSSProperties} // flèches 18 px
      >
        {images.map((url, i) => (
          <SwiperSlide
            key={i}
            className="w-[70vw] max-w-[420px] h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={`${API_URL}${url}`}
                alt={`Studio ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #ffffff; /* flèches blanches */
        }
      `}</style>
    </>
  );
}
