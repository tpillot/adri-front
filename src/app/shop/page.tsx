import { fetchStrapi, API_URL } from "@/lib/api";
import ShopCarousel from "@/components/ShopCarousel";

export default async function ShopPage() {
  const { data } = await fetchStrapi<{ data: any[] }>("/shops?populate=*");

  const urls = [...data]
    .reverse()
    .map((item) => `${API_URL}${item.product?.[0]?.url}`)
    .filter(Boolean);

  return <ShopCarousel urls={urls} />;
}
