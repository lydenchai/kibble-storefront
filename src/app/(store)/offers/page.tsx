import { getProductsAction } from "@/actions/product.actions";
import OffersContent from "./OffersContent";

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  // Fetch products with large limit to find active discounted items
  const response = await getProductsAction({ limit: '100' });
  const allProducts = response.data || [];
  
  // Filter products with active discounts (compareAtPrice > price)
  const offerProducts = allProducts
    .filter((product) => {
      const mainVariant = product.variants?.[0];
      return mainVariant?.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price;
    })
    .map((product) => {
      const mainVariant = product.variants[0];
      const compareAtPrice = mainVariant?.compareAtPrice || mainVariant?.price || 0;
      const price = mainVariant?.price || 0;
      const discountPercentage = compareAtPrice > price
        ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
        : 0;
      const savingsAmount = Math.round((compareAtPrice - price) * 100) / 100;

      return {
        ...product,
        discountPercentage,
        savingsAmount
      };
    });

  return <OffersContent offerProducts={offerProducts} />;
}
