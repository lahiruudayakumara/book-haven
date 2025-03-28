import { PageHeader } from "@/components/page-header";
import { Truck } from "lucide-react";

export default function Delivery() {
  return (
    <div>
      <PageHeader title="Delivery" description="Explore delivery options, view estimated delivery times, and track your current orders with ease." />
      <div className="flex flex-col items-center md:min-h-[27vh] text-gray-200 justify-center space-y-2">
        <Truck size={70} />
        <p className="font-bold">No Delivery Avialable</p>
      </div>
    </div>
  );
}
