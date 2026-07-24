import { getProductsAction } from "@/actions/product.actions";
import BrandsContent, { BrandItem } from "./BrandsContent";

export const dynamic = 'force-dynamic';

export default async function BrandsPage() {
  // Fetch products to dynamically aggregate brands & product count per brand
  const response = await getProductsAction({ limit: '100' });
  const products = response.data || [];

  // Default fallback popular brands if products dataset is empty
  const defaultBrands: BrandItem[] = [
    { name: "Royal Canin", count: 18, featured: true },
    { name: "Purina Pro Plan", count: 14 },
    { name: "Hill's Science Diet", count: 12 },
    { name: "Blue Buffalo", count: 10 },
    { name: "Orijen", count: 8 },
    { name: "Taste of the Wild", count: 9 },
    { name: "Wellness", count: 11 },
    { name: "Merrick", count: 7 },
  ];

  // Aggregate brand counts from database products
  const brandCountMap = new Map<string, number>();
  products.forEach((p) => {
    if (p.brand) {
      const brandName = p.brand.trim();
      brandCountMap.set(brandName, (brandCountMap.get(brandName) || 0) + 1);
    }
  });

  let aggregatedBrands: BrandItem[] = Array.from(brandCountMap.entries()).map(([name, count], index) => ({
    name,
    count,
    featured: index === 0
  }));

  // Merge default popular brands if fewer than 5 aggregated
  if (aggregatedBrands.length < 5) {
    const existingNames = new Set(aggregatedBrands.map(b => b.name.toLowerCase()));
    defaultBrands.forEach(db => {
      if (!existingNames.has(db.name.toLowerCase())) {
        aggregatedBrands.push(db);
      }
    });
  }

  // Sort brands alphabetically
  aggregatedBrands.sort((a, b) => a.name.localeCompare(b.name));

  return <BrandsContent brands={aggregatedBrands} />;
}
