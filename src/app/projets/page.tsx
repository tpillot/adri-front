// app/page.tsx
import { fetchStrapi, API_URL } from "@/lib/api";
import MediaCard from "@/components/MediaCard";

export default async function Page() {
  const json = await fetchStrapi<{ data: any }>("/projets?populate=*");
  const projets = json.data.sort((a: any, b: any) => a.ordre - b.ordre);

  return (
    <main className="relative w-screen">
      <div className="flex flex-col">
        {projets.map((p: any, index: number) => {
          const mediaUrl = `${API_URL}${p.media.url}`;
          const posterUrl = p.poster?.url ? `${API_URL}${p.poster.url}` : undefined;
          const isVideo = mediaUrl.endsWith(".mp4");

          return (
            <MediaCard
              key={index}
              mediaUrl={mediaUrl}
              posterUrl={posterUrl}
              slug={p.slug}
              titre={p.titre}
              sous_titre={p.sous_titre}
              isVideo={isVideo}
            />
          );
        })}
      </div>
    </main>
  );
}
