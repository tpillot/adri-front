import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET!;

async function fetchSlugs(): Promise<string[]> {
  const res = await fetch(`${API_URL}/projets?fields[0]=slug&pagination[pageSize]=100`);

  if (!res.ok) throw new Error("Erreur fetch slugs");

  const json = await res.json();
  return json.data.map((item: any) => item.attributes.slug);
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  console.log("Webhook reçu !");

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const slugs = await fetchSlugs();
    const paths = ["/", "/projets", ...slugs.map((slug) => `/projets/${slug}`)];

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
