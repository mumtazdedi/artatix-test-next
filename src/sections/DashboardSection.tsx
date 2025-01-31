"use client";
import { Card } from "@/components/ui/card";
import { useGetTalentsQuery } from "@/services/talent";
import {
  Calendar,
  CircleDollarSign,
  Printer,
  TicketPercent,
} from "lucide-react";

export default function DashboardSection() {
  const { data: talents } = useGetTalentsQuery();

  return (
    <>
      <Card className="flex flex-col gap-6 p-4 w-full">
        <div className="flex items-center gap-4">
          <Calendar className="h-6 w-6 text-primary" />

          <span className="text-sm font-semibold text-slate-500">
            Event Aktif
          </span>
        </div>

        <span className="text-2xl font-semibold">
          {talents?.talents?.filter((talent) => talent.isActive === 1).length ||
            0}
        </span>
      </Card>

      <Card className="flex flex-col gap-6 p-4 w-full">
        <div className="flex items-center gap-4">
          <TicketPercent className="h-6 w-6 text-purple-600" />

          <span className="text-sm font-semibold text-slate-500">
            Total Tiket Terjual
          </span>
        </div>

        <span className="text-2xl font-semibold">200.000</span>
      </Card>

      <Card className="flex flex-col gap-6 p-4 w-full">
        <div className="flex items-center gap-4">
          <Printer className="h-6 w-6 text-orange-600" />

          <span className="text-sm font-semibold text-slate-500">
            Total Transaksi
          </span>
        </div>

        <span className="text-2xl font-semibold">10.000</span>
      </Card>

      <Card className="flex flex-col gap-6 p-4 w-full">
        <div className="flex items-center gap-4">
          <CircleDollarSign className="h-6 w-6 text-green-600" />

          <span className="text-sm font-semibold text-slate-500">
            Total Pendapatan
          </span>
        </div>

        <span className="text-2xl font-semibold">Rp. 200.000.000</span>
      </Card>
    </>
  );
}
