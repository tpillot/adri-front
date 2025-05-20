// components/MediaCard.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { Jost, Poppins } from "next/font/google";

const jost = Jost({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });

type Props = {
  thumbnailUrl: string;
  slug: string;
  titre: string;
  sous_titre: string;
  isVideo: boolean;
};

export default function MediaCard({ thumbnailUrl, slug, titre, sous_titre, isVideo }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      href={`/projets/${slug}`}
      className="group relative block w-full h-[620px] bg-cover bg-center overflow-hidden cursor-pointer"
      style={!isVideo ? { backgroundImage: `url('${thumbnailUrl}')` } : undefined}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {isVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          preload="metadata"
        >
          <source src={thumbnailUrl} type="video/mp4" />
        </video>
      )}

      {/* bloc texte en bas-droite, animé comme avant */}
      <div
        className={`${jost.className} absolute bottom-7 right-7 text-right z-10
                    transition-all duration-200 group-hover:opacity-70`}
      >
        <span className={`${poppins.className} block text-[15px] font-medium leading-tight`}>
          {titre}
        </span>
        <span className="block text-[13px] tracking-widest leading-tight">
          {sous_titre}
        </span>
      </div>
    </Link>
  );
}
