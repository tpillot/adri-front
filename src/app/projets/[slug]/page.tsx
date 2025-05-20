export const dynamic = "force-dynamic"; 
export const dynamicParams = true; 
import { fetchStrapi, API_URL } from "@/lib/api";
import Video from "@/components/VideoPlayer";

export default async function Page(
  props: { params: Promise<{ slug: string }> }   // ← typé comme Promise
) {
  const { slug } = await props.params;

  const query = `filters[slug][$eq]=${slug}&populate=ressources.media&populate[1]=ressources.mux_asset`;
  const json = await fetchStrapi<{ data: any }>(`/projets?${query}`);

  if (!json.data?.length) return <main>Projet introuvable</main>;

  const projet = json.data[0];
  const ressources = projet.ressources || [];

  const primary = ressources.find((r: any) => r.ordre === 1);
  const others = ressources
    .filter((r: any) => r.ordre !== 1)
    .sort((a: any, b: any) => a.ordre - b.ordre);

  return (
    <main className="w-full min-h-screen flex flex-col">

      {/* ▶️ Lecteur : toujours 100 % de largeur, ratio 16/9 */}
      <div className="w-full">
        {primary?.type === "youtube" && (
          <Video type="youtube" youtubeUrl={primary.youtube} />
        )}
        {primary?.type === "mux_asset" && (
          <Video type="mux" playbackId={primary.mux_asset?.playback_id} />
        )}
        {primary?.type === "video" && (
          <Video type="local" src={`${API_URL}${primary.media?.url}`} />
        )}
        {primary?.type === "image" && primary.media?.url && (
          <img
            src={`${API_URL}${primary.media.url}`}
            alt={primary.legende || "Image"}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      {others.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-8 px-4">
          {others.map((f: any, i: number) => (
            <div
              key={i}
              className="w-full sm:w-[620px] h-[420px] bg-gray-200 bg-cover bg-center"
              style={{
                backgroundImage: `url('${API_URL}${f.media?.url}')`,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
