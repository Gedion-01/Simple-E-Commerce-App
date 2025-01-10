import { getProduct, getRelatedProducts } from "@/lib/api";
import { Product } from "./_components/product";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(parseInt(params.id, 10));
  const relatedProducts = await getRelatedProducts(product.id);

  return <Product product={product} relatedProducts={relatedProducts} />;
}
