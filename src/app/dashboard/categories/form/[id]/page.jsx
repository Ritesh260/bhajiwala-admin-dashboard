import CategoryForm from "@/views/dashboard/categories/CategoryForm";

export default function Page({ params }) {

  return (
    <CategoryForm
      id={params.id}
    />
  );

}