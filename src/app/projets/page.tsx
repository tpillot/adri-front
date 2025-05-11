import { Jost, Poppins } from "next/font/google";
import Link from "next/link";
import { fetchStrapi, API_URL } from "@/lib/api";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default async function Page() {
  const json = await fetchStrapi<{
    data: any;
  }>("/projets?populate=*");

  const projets = json.data.sort((a: any, b: any) => a.ordre - b.ordre);

  return (
    <main className="relative w-screen">
      <div className="flex flex-col">
        {projets.map((f: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full h-[650px] bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url('${API_URL}${f.thumbnail.url}')`,
              }}
            >
              <Link
                className={`${jost.className} text-[14px] tracking-[8px] px-24 hover:opacity-70 text-center cursor-pointer transition-all duration-200`}
                href={`/projets/${f.slug}`}
              >
                <b className={`${poppins.className} text-[16px]`}>{f.titre}</b> {f.sous_titre}
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
