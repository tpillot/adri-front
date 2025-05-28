// components/MediaCard.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Jost, Poppins } from "next/font/google";

const jost    = Jost({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });

type Props = {
  mediaUrl:   string;  
  posterUrl?: string;  
  slug:       string;
  titre:      string;
  sous_titre: string;
  isVideo:    boolean;
};

export default function MediaCard({
  mediaUrl,
  posterUrl,
  slug,
  titre,
  sous_titre,
  isVideo,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  // détection mobile simplifiée
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);

  /* autoplay uniquement sur mobile quand la vidéo est prête */
  useEffect(() => {
    if (isMobile && videoRef.current && canPlay) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMobile, canPlay]);

  /* handlers desktop */
  const handleEnter = () => {
    if (!isVideo || isMobile || !videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const handleLeave = () => {
    if (!isVideo || isMobile || !videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <Link
      href={`/projets/${slug}`}
      className="group relative block w-full h-[710px] overflow-hidden cursor-pointer bg-cover bg-center"
      style={{ backgroundImage: `url('${isVideo ? posterUrl : mediaUrl}')` }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {isVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
          muted
          loop
          playsInline          
          preload="metadata"
          autoPlay={isMobile}  
          poster={posterUrl}   
          onCanPlay={() => setCanPlay(true)}
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      )}

      <div
        className={`${jost.className} absolute bottom-7 right-7 text-right z-20 transition-opacity duration-200 group-hover:opacity-70`}
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
