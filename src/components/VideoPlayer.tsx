"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

export default function VideoPlayer(props: {
  videoUrl: string;
  width: string | number;
  height: string | number;
}) {
  const { videoUrl, width, height } = props;
  return (
    <div className="">
      <ReactPlayer
        url={videoUrl}
        controls
        width={width}
        height={height}
        playing={true}
        preload="auto"
      />
    </div>
  );
}
