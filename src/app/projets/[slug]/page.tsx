import { fetchStrapi, API_URL } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";

export default async function Page(params: { params: { slug: string } }) {
  const { slug } = params.params;
  const json = await fetchStrapi<{
    data: any;
  }>(`/projets?filters[slug][$eq]=${slug}&populate=ressources.media`);
  console.log(json);

  if (json.data.length === 0) {
    return null
  }

  const primary = json.data[0].ressources.find((f: any) => f.ordre === 1);
  const others = json.data[0].ressources.filter((f: any) => f.ordre !== 1).sort((a: any, b: any) => a.ordre - b.ordre);

  console.log(API_URL + primary.media.url);

  return (
    <main className="relative w-screen h-screen">
      {primary.type === "video" && <VideoPlayer
        videoUrl={API_URL + primary.media.url}
        width="100%"
        height="auto"
      />}

      <div className="flex flex-col">
        {others.map((f: any, index: number) => {
          return (
            <div
              key={index}
              className="w-[620px] h-[420px] bg-cover bg-center"
              style={{
                backgroundImage: `url('${API_URL}${f.media.url}')`,
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
