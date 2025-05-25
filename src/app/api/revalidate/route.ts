import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const API_URL = "https://cms.120-production.com/api";
const REVALIDATE_SECRET = "0fbf9f4ee273af67f6121903a283a270f8e4baea2b057d694310a92be7362968";

async function fetchSlugs(): Promise<string[]> {
  const res = await fetch(
    `${API_URL}/projets?fields[0]=slug&pagination[pageSize]=100`
  );

  if (!res.ok) throw new Error("Erreur fetch slugs");

  const json = await res.json();
  return json.data.map((item: any) => item.slug);
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  console.log("Webhook reçu !");

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const staticPaths = ["/", "/projets", "/contact", "/nos-references", "/studio", "/shop"];
    const slugs = await fetchSlugs();
    const dynamicPaths = slugs.map((s) => `/projets/${s}`);
    const allPaths = [...staticPaths, ...dynamicPaths];

    for (const path of allPaths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths: allPaths });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
