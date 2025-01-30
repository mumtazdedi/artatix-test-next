"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL, cn } from "@/lib/utils";
import { useGetTalentsQuery } from "@/services/talent";
import { CircleX, Ellipsis, PenLine, Trash2 } from "lucide-react";
import Image from "next/image";

export default function TalentSection() {
  const { data: talents, isFetching } = useGetTalentsQuery();

  return (
    <div className="flex items-center flex-wrap gap-3">
      {isFetching && <div>Loading...</div>}
      {talents &&
        !isFetching &&
        talents.talents?.map((talent, index) => (
          <div className="flex flex-col gap-2 w-fit" key={index}>
            <div className="flex items-center justify-between">
              <Badge
                className={cn(
                  "text-sm w-fit",
                  talent.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {talent.isActive ? "Active" : "Inactive"}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <PenLine className="h-4 w-4" />
                    Edit Talent
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CircleX className="h-4 w-4" />
                    Nonaktifkan
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                    Hapus Talent
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Image
              className="w-48 h-48 rounded-md"
              src={`${BASE_URL}/${talent.image}`}
              alt={talent.name}
              width={400}
              height={400}
            />

            <h1 className=" font-semibold">{talent.name}</h1>
          </div>
        ))}
    </div>
  );
}
