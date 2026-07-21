import { getProductsAction } from "@/actions/product.actions";
import OffersContent from "./OffersContent";

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  // Fetch a list of products, maybe sorted by price or newest, and filter those on sale
  const response = await getProductsAction({ limit: '50' }); // Fetch more to find offers
  
  // An offer is where the first variant has compareAtPrice > price
  const offerProducts = response.data.filter(product => {
    const mainVariant = product.variants?.[0];
    return mainVariant?.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price;
  });

  return <OffersContent offerProducts={offerProducts} />;
}
