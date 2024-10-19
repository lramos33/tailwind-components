import { Header } from "@/modules/calendar/components/header";
import { Month } from "@/modules/calendar/components/month";

export default function Page() {
  return (
    <div className="h-fit w-full rounded-xl border">
      <Header />
      <Month />
    </div>
  );
}
