import ProductDetails from "@/views/dashboard/products/ProductDetails";

export default async function Page({ params }) {
  const { id } = await params;

  return <ProductDetails id={id} />;
}
