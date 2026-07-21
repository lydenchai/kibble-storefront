import { getProductsAction } from "@/actions/product.actions";
import CategoryContent from "./CategoryContent";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await params;
  const resolvedParams = await searchParams;

  // Clamp limit to 6 so the 3-col grid fills 2 rows and pagination kicks in
  const limit = (resolvedParams.limit as string) || "6";
  const response = await getProductsAction({
    ...resolvedParams,
    petType: type,
    limit,
  });
  const products = response.data;
  const { total, page, pages } = response.pagination;

  const titleCaseType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <CategoryContent
      products={products}
      total={total}
      page={page}
      pages={pages}
      resolvedParams={resolvedParams}
      limit={limit}
      type={type}
      titleCaseType={titleCaseType}
    />
  );
}
