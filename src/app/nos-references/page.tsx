import Image from "next/image";
import { fetchStrapi, API_URL } from "@/lib/api";

export default async function Page() {
  const { data: generalData } = await fetchStrapi<{ data: any }>(
    "/nous?populate=*"
  );

  const { data: photoData } = await fetchStrapi<{ data: any }>(
    "/nous?populate=backstage_photos.image"
  );

  return (
    <main className="w-screen min-h-screen flex flex-col pt-[150px]">
      <section className="w-full bg-black text-white flex flex-col lg:flex-row items-start px-5 md:pl-[15%] py-12 gap-10">
        <p className="flex-1 text-lg md:text-xl lg:text-3xl font-semibold leading-snug">
        {generalData.titre}
      </p>


        <p className="flex-1 text-sm lg:text-base font-light whitespace-pre-line leading-relaxed">
          {generalData.presentation}
        </p>
      </section>

      <section className="relative w-full">
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] xl:h-[80vh]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={`${API_URL}${generalData.teaser?.url}`}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 flex items-center px-5 md:pl-[15%]">
            <ul className="grid grid-cols-2 gap-2 text-white text-sm lg:text-base font-medium">
              {generalData.domaines?.map((d: any, i: number) => (
                <li key={i}>{d.nom}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full bg-black text-white flex flex-col lg:flex-row items-start px-5 md:pl-[15%] py-12 gap-10 pr-10">
        <p className="flex-1 text-sm lg:text-base font-light whitespace-pre-line leading-snug">
          {generalData.presentation_2}
        </p>
      </section>

      {photoData.backstage_photos?.length > 0 && (
        <section className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0">
            {photoData.backstage_photos.map((item: any, i: number) => {
              const image = item.image;
              if (!image?.url) return null;

              return (
                <div
                  key={i}
                  className="relative w-full pt-[150%] overflow-hidden"
                >
                  <Image
                    src={`${API_URL}${image.url}`}
                    alt={`Backstage ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 16.66vw,
                          (min-width:768px) 25vw,
                          50vw"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
