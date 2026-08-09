import CategoryForm from "@/views/dashboard/categories/CategoryForm";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <CategoryForm id={id} />
  );
}