"use client";

import MuxPlayer from "@mux/mux-player-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

type VideoProps = {
  type: "mux" | "youtube" | "local";
  playbackId?: string;
  youtubeUrl?: string;
  src?: string;
};

export default function Video({
  type,
  playbackId,
  youtubeUrl,
  src,
}: VideoProps) {

  const wrapperClass =
    "relative w-full h-[100vh] md:h-auto overflow-hidden rounded-lg shadow";

  const innerStyle: React.CSSProperties = { position: "absolute", inset: 0 };

  if (type === "youtube" && youtubeUrl) {
    return (
      <div className={wrapperClass} style={{ aspectRatio: "16/9" }}>
        <ReactPlayer
          url={youtubeUrl}
          playing
          controls
          width="100%"
          height="100%"
          style={innerStyle}
        />
      </div>
    );
  }

  if (type === "mux" && playbackId) {
    return (
      <div className={wrapperClass} style={{ aspectRatio: "16/9" }}>
        <MuxPlayer
          playbackId={playbackId}
          streamType="on-demand"
          autoPlay
          className="w-full h-full"
          style={innerStyle}
        />
      </div>
    );
  }

  if (type === "local" && src) {
    return (
      <div className={wrapperClass} style={{ aspectRatio: "16/9" }}>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return null;
}
