import CustomerDetails from "@/views/dashboard/customers/CustomerDetails";


export default function Page({ params })  {
  return <CustomerDetails id={params.id} />;
}