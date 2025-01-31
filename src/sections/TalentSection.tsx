"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL, cn, handleErrorMessage } from "@/lib/utils";
import {
  useDeleteTalentMutation,
  useGetTalentsQuery,
  useUpdateTalentMutation,
} from "@/services/talent";
import { CircleX, Ellipsis, PenLine, Trash2 } from "lucide-react";
import Image from "next/image";
import TalentFormSection from "./TalentFormSection";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TalentResponse } from "@/interfaces/talent";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TalentSection() {
  const { data: talents, isFetching } = useGetTalentsQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<TalentResponse>();

  const [updateTalent] = useUpdateTalentMutation();
  const [deleteTalent] = useDeleteTalentMutation();

  const handleActivate = async (talent: TalentResponse) => {
    try {
      await updateTalent({
        id: talent.id?.toString(),
        body: {
          name: talent.name,
          isActive: talent.isActive === 1 ? 0 : 1,
        },
      });
      toast.success(
        `${talent.name} ${
          !talent.isActive ? "Berhasil Diaktifkan!" : "Berhasil Dinonaktifkan!"
        }`
      );
    } catch (error) {
      toast.error(handleErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTalent((selectedTalent?.id || "").toString());
      toast.success(`${selectedTalent?.name} Berhasil Dihapus!`);
      setOpenDeleteDialog(false);
    } catch (error) {
      toast.error(handleErrorMessage(error));
    }
  };

  return (
    <>
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
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Tambah Talent
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <TalentFormSection
                onClose={() => setOpenDialog(false)}
                talent={selectedTalent}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Apakah yakin ingin menghapus talent{" "}
                  {selectedTalent?.name || ""}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Talent yang sudah dihapus tidak dapat dikembalikan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-wrap gap-6">
            {isFetching && <div>Loading...</div>}
            {talents &&
              !isFetching &&
              talents.talents?.map((talent, index) => (
                <div
                  className="flex flex-col gap-2 w-full md:w-fit"
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      className={cn(
                        "text-sm w-fit",
                        talent.isActive === 1
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTalent(talent);
                            setOpenDialog(true);
                          }}
                        >
                          <PenLine className="h-4 w-4" />
                          Edit Talent
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleActivate(talent)}
                        >
                          <CircleX className="h-4 w-4" />
                          {talent.isActive === 1 ? "Nonaktifkan" : "Aktifkan"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => {
                            setSelectedTalent(talent);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Hapus Talent
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Image
                    className="w-full h-auto md:w-48 md:h-48 rounded-md"
                    src={`${BASE_URL}/${talent.image}`}
                    alt={talent.name}
                    priority
                    width={400}
                    height={400}
                  />

                  <h1 className=" font-semibold">{talent.name}</h1>
                </div>
              ))}
          </div>
        </div>
      </Card>
    </>
  );
}
