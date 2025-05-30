import { fetchStrapi, API_URL } from "@/lib/api";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa";

const Contact: React.FC<{
  text1: string;
  text2?: string;
  text3?: string;
}> = ({ text1, text2, text3 }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-bold">{text1}</p>
      {text2 && <p className="text-md">{text2}</p>}
      {text3 && <p className="text-md">{text3}</p>}
    </div>
  );
};

const getIconForNetwork = (nom: string) => {
  switch (nom.toLowerCase()) {
    case "instagram":
      return <FaInstagram className="w-8 h-8" />;
    case "twitter":
      return <FaTwitter className="w-8 h-8" />;
    case "linkedin":
      return <FaLinkedin className="w-8 h-8" />;
    case "youtube":
      return <FaYoutube className="w-8 h-8" />;
    case "facebook":
      return <FaFacebook className="w-8 h-8" />;
  }
};


export default async function Page() {
  const json = await fetchStrapi<{ data: any }>("/contact?populate=*");
  const videoUrl = json.data.video ? `${API_URL}${json.data.video.url}` : undefined;

  return (
    <main className="relative h-screen w-screen overflow-hidden pt-[130px] pb-[80px] flex flex-col">
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

      <div className="flex flex-col flex-1 justify-center gap-32 z-10">
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-white">
            <p className="text-lg font-bold">120 PRODUCTION</p>
            <a href={`mailto:${json.data.mail}`} className="text-md underline">
              {json.data.mail}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:justify-evenly sm:flex-row sm:gap-0 text-white">
          {json.data.fondateurs.map((f: any, index: number) => (
            <Contact
              key={index}
              text1={f.nom}
              text2="FONDATEURS ET PRODUCTEURS"
              text3={f.telephone}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center z-10 text-white mt-8">
        <div className="flex gap-4">
          {json.data.reseaux.map((r: any, index: number) => (
            <a
              key={index}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              {getIconForNetwork(r.nom)}
            </a>
          ))}
        </div>
        <p className="text-md">Paris & Rennes</p>
      </div>
    </main>
  );
}
