import { Gift } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function Cart() {
  return (
    <div>
      <PageHeader title="Offers" description="This is the cart page" />
      <div className="flex flex-col items-center md:min-h-[27vh] text-gray-200 justify-center space-y-2">
        <Gift size={70} />
        <p className="font-bold">No Offer Avialable</p>
      </div>
    </div>
  );
}
