import { fetchStrapi, API_URL } from "@/lib/api";

type Media = { url: string } | null;

export default async function Home() {
  const json = await fetchStrapi<{
    data: {
      video:  Media;
    };
  }>("/home?populate=video")
  const videoUrl  = json.data.video  ? `${API_URL}${json.data.video.url}`   : undefined;
  // const posterUrl = json.data.poster ? `${API_URL}${json.data.poster.url}` : undefined;

  console.log({json, API_URL, videoUrl});

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {videoUrl && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
    </main>
  );
}
