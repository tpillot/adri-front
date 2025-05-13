"use client";

import MuxPlayer from "@mux/mux-player-react";
import ReactPlayer from "react-player/youtube";


export default function Video({
  type,
  playbackId,
  youtubeUrl,
  src,
  width = "100%",
  height = "auto",
}: {
  type: "mux" | "youtube" | "local";
  playbackId?: string;
  youtubeUrl?: string;
  src?: string;
  width?: string | number;
  height?: string | number;
}) {
  if (type === "youtube" && youtubeUrl) {
    return (
      <ReactPlayer
        url={youtubeUrl}
        width="100%"
        height="100%"
        playing={true}
        controls
        style={{
          aspectRatio: "16/9", // CSS natif (équivaut à Tailwind aspect-video)
        }}
      />
    );
  }

  if (type === "mux" && playbackId) {
    return (
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay
        style={{ width, height }}
      />
    );
  }

  if (type === "local" && src) {
    return (
      <video
        src={src}
        width={width}
        height={height}
        controls
        autoPlay
        playsInline
        className="rounded-lg shadow"
      />
    );
  }

  return null;
}
