import { getProductsAction } from "@/actions/product.actions";
import ProductsContent from "./ProductsContent";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const limit = (resolvedParams.limit as string) || "6";
  const response = await getProductsAction({ ...resolvedParams, limit });
  const products = response.data;
  const { total, page, pages } = response.pagination;

  return (
    <ProductsContent
      products={products}
      total={total}
      page={page}
      pages={pages}
      resolvedParams={resolvedParams}
      limit={limit}
    />
  );
}
