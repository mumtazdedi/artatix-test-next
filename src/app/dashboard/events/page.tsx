import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TalentSection from "@/sections/TalentSection";
import { Suspense } from "react";

export default function EventPage() {
  return (
    <div className="flex flex-col gap-6 px-4 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Informasi</h1>
        <p className="text-sm text-muted-foreground">
          Tambahkan informasi mengenai event
        </p>
      </div>
      <Card className="w-full p-4 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Talent</h1>
          </div>
          <Button>Add Talent</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Suspense>
            <TalentSection />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}
