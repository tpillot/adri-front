import { fetchStrapi, API_URL } from "@/lib/api";
import StudioCarousel from "@/components/StudioCarousel";

export default async function Page() {
  const { data: general } = await fetchStrapi<{ data: any }>("/studio?populate=*");

  const { data: photos } = await fetchStrapi<{ data: any }>(
    "/studio?populate=studio_photos.image"
  );

  const images =
    photos.studio_photos?.map((p: any) => p.image?.[0]?.url).filter(Boolean) || [];

  const description = general.description as any[];

  return (
    <main className="w-screen min-h-screen flex flex-col lg:flex-row pt-[150px]">
      {/* Carrousel */}
      <section className="w-full lg:w-3/5 px-4 lg:px-8">
        <StudioCarousel images={images} />
      </section>

      {/* Description maison */}
      <section className="w-full lg:w-2/5 px-5 lg:px-12 py-12">
      {general.description.map((block: any, index: number) => {
          const text = block.children?.map((c: any) => c.text).join("") ?? "";

          if (block.type === "heading") {
            return (
              <p
                key={index}
                className="flex-1 text-base md:text-lg lg:text-xl font-semibold leading-snug mb-4"
              >
                {text}
              </p>
            );
          }

          if (block.type === "paragraph") {
            return (
              <p
                key={index}
                className="flex-1 text-sm lg:text-base font-light whitespace-pre-line leading-relaxed mb-4"
              >
                {text}
              </p>
            );
          }

          return null;
        })}
      </section>
    </main>
  );
}
