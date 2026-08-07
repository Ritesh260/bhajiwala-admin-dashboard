import DeliveryDetails from "@/views/dashboard/delivery/DeliveryDetails";

export default async function Page({ params }) {
  const { id } = await params;

  return <DeliveryDetails id={id} />;
}