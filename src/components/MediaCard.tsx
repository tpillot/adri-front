"use client";

import { useRef, useEffect, useState } from "react";
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
  const [canPlay, setCanPlay] = useState(false);

  const isMobile = typeof window !== "undefined" &&
                   /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);

  /* ► lance l’auto-play sur mobile quand la vidéo est prête */
  useEffect(() => {
    if (isMobile && videoRef.current && canPlay) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile, canPlay]);

  return (
    <Link
      href={`/projets/${slug}`}
      className="group relative block w-full h-[620px] bg-cover bg-center overflow-hidden cursor-pointer"
      /* ► on laisse TOUJOURS l’image de fond pour servir de fallback */
      style={{ backgroundImage: `url('${thumbnailUrl}')` }}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {isVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
          muted
          loop
          playsInline               /* indispensable pour iOS */
          preload="metadata"
          autoPlay={isMobile}       /* autoPlay seulement sur mobile */
          poster={thumbnailUrl}     /* fallback affiché tant que la vidéo ne joue pas */
          onCanPlay={() => setCanPlay(true)}
        >
          <source src={thumbnailUrl} type="video/mp4" />
        </video>
      )}

      {/* bloc texte en bas-droite */}
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
