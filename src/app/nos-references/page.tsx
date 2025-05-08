import { fetchStrapi, API_URL } from "@/lib/api";

export default async function Page() {
  const json = await fetchStrapi<{
    data: any;
  }>("/nous?populate=*");

  return (
    <main className="relative h-screen w-screen pt-[130px] flex flex-col lg:pr-[50px] lg:flex-row">
      <div className="flex flex-col flex-1 px-[100px] py-[50px]">
        <p className="text-[40px] font-bold">
          {json.data.titre}
        </p>

        <p className="text-lg mt-[40px] whitespace-pre-line leading-[1.2]">
          {json.data.presentation}
        </p>

        <div className="flex flex-col mt-[40px]">
          {json.data.domaines.map((f: any, index: number) => {
            return (
              <p key={index} className="text-lg font-bold">{f.nom}</p>
            );
          })}
        </div>
      </div>

      <div className="bg-cover bg-center h-[500px] lg:h-full lg:w-[40%] rounded-sm" style={{ backgroundImage: `url('${API_URL}${json.data.photo.url}')` }}></div>
    </main>
  );
}
