// app/page.tsx
import { fetchStrapi, API_URL } from "@/lib/api";
import MediaCard from "@/components/MediaCard";

export default async function Page() {
  const json = await fetchStrapi<{ data: any }>("/projets?populate=*");
  const projets = json.data.sort((a: any, b: any) => a.ordre - b.ordre);

  return (
    <main className="relative w-screen">
      <div className="flex flex-col">
        {projets.map((f: any, index: number) => {
          const url = `${API_URL}${f.thumbnail.url}`;
          const isVideo = url.endsWith(".mp4");
          return (
            <MediaCard
              key={index}
              thumbnailUrl={url}
              slug={f.slug}
              titre={f.titre}
              sous_titre={f.sous_titre}
              isVideo={isVideo}
            />
          );
        })}
      </div>
    </main>
  );
}
