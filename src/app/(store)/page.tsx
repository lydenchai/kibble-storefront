import { getProductsAction } from "@/actions/product.actions";
import HomeContent from "./HomeContent";

export default async function Home() {
  const response = await getProductsAction({ limit: '8', sort: '-createdAt' });
  const featuredProducts = response.data || [];

  return (
    <HomeContent featuredProducts={featuredProducts} />
  );
}
