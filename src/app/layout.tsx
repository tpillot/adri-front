// app/layout.tsx
import "./globals.css";
import { fetchStrapi, API_URL } from "@/lib/api";
import Header from "@/components/Header";
import { ReactNode } from "react";

// import { Space_Grotesk, Poppins } from "next/font/google";

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   display: "swap",
// });

export const metadata = {
  title: "120 Production",
  description: "Société de production audiovisuelle",
};

async function getLogo(): Promise<string> {
  const { data } = await fetchStrapi<{ data: { logo: { url: string } } }>("/header");
  return `${API_URL}${data.logo.url}`;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const logoUrl = await getLogo();

  return (
    <html lang="fr">
      <body>
        <Header logoUrl={logoUrl} />
        {children}
      </body>
    </html>
  );
}
