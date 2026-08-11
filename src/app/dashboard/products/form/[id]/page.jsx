import ProductForm from "@/views/dashboard/products/ProductForm";

export default async function Page({ params }) {
  const { id } = await params;

  return <ProductForm id={id} />;
}