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
  width?: string | number;
  height?: string | number;
};

export default function Video({
  type,
  playbackId,
  youtubeUrl,
  src,
  width = "100%",
  height = "auto",
}: VideoProps) {
  if (type === "youtube" && youtubeUrl) {
    return (
      <div style={{ width, height: "auto", aspectRatio: "16/9" }}>
        <ReactPlayer
          url={youtubeUrl}
          width="100%"
          height="100%"
          playing
          controls
        />
      </div>
    );
  }

  if (type === "mux" && playbackId) {
    return (
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay
        style={{
          width,
          height,
          aspectRatio: "16/9",
        }}
      />
    );
  }

  if (type === "local" && src) {
    return (
      <video
        src={src}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        controls
        autoPlay
        playsInline
        className="rounded-lg shadow w-full h-auto"
        style={{ aspectRatio: "16/9" }}
      />
    );
  }

  return null;
}
