import TalentSection from "@/sections/TalentSection";
import { Suspense } from "react";

export default function EventPage() {
  return (
    <div className="flex flex-col gap-6 px-4 w-full">
      <Suspense>
        <TalentSection />
      </Suspense>
    </div>
  );
}
