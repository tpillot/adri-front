"use client";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const MuxPlayer = dynamic(
  () =>
    import("@mux/mux-player-react").then((mod) => mod.default),
  { ssr: false }
);

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
    "relative w-full h-[90vh] overflow-hidden rounded-lg shadow bg-black";
  const innerClass = "absolute inset-0 w-full h-full object-contain";

  if (type === "youtube" && youtubeUrl) {
    return (
      <div className={wrapperClass}>
        <ReactPlayer
          url={youtubeUrl}
          playing
          controls
          width="100%"
          height="100%"
          className={innerClass}
          style={{ objectFit: 'contain' }} // si tu veux forcer le contain
        />
      </div>
    );
  }

  if (type === "mux" && playbackId) {
    return (
      <div className={wrapperClass}>
        <MuxPlayer
          playbackId={playbackId}
          streamType="on-demand"
          autoPlay
          className={innerClass}
        />
      </div>
    );
  }

  if (type === "local" && src) {
    return (
      <div className={wrapperClass}>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className={innerClass}
        />
      </div>
    );
  }

  return null;
}
