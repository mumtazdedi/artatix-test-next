"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TalentRequest, TalentResponse } from "@/interfaces/talent";
import { BASE_URL, handleErrorMessage } from "@/lib/utils";
import {
  useCreateTalentMutation,
  useUpdateTalentMutation,
} from "@/services/talent";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  talent?: TalentResponse;
}

export default function TalentFormSection({ onClose, talent }: Props) {
  const form = useForm<TalentRequest>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const [createTalent, { isLoading }] = useCreateTalentMutation();
  const [updateTalent, { isLoading: isUpdating }] = useUpdateTalentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = form;

  const onSubmit = async (data: TalentRequest) => {
    if (talent) {
      try {
        await updateTalent({
          id: talent.id?.toString(),
          body: {
            name: data.name,
            image: data.image,
            isActive: talent.isActive,
          },
        })
          .unwrap()
          .then(() => {
            toast.success("Talent berhasil diupdate");
            onClose();
          });
      } catch (error) {
        toast.error(handleErrorMessage(error));
      }
    } else {
      try {
        await createTalent({
          name: data.name,
          image: data.image,
        })
          .unwrap()
          .then(() => {
            toast.success("Talent berhasil ditambahkan");
            onClose();
          });
      } catch (error) {
        toast.error(handleErrorMessage(error));
      }
    }
  };

  useEffect(() => {
    if (talent) {
      form.setValue("name", talent.name);
    }
  }, [talent]);

  console.log(talent);

  return (
    <>
      <DialogTitle>{talent ? "Edit Talent" : "Tambah Talent"}</DialogTitle>

      <DialogDescription></DialogDescription>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nama Talent</Label>
            <Input
              id="name"
              placeholder="Name"
              {...register("name", {
                required: "Nama Talent tidak boleh kosong",
              })}
            />
            {formErrors?.name && (
              <p className="text-sm text-red-500">
                {formErrors?.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Gambar Talent</Label>
            <div className="border group relative border-dashed rounded-md h-52 overflow-hidden">
              <div className="w-full absolute h-full group-hover:bg-slate-900 group-hover:opacity-80 flex items-center justify-center">
                {form.watch("image") && form.watch("image")?.length > 0 && (
                  <Image
                    src={URL.createObjectURL(form.watch("image")?.[0])}
                    alt="image"
                    priority
                    className="w-auto h-auto object-cover"
                    width={400}
                    height={400}
                  />
                )}
                {talent?.image && !form.watch("image")?.[0] ? (
                  <Image
                    src={`${BASE_URL}/${talent.image}`}
                    alt="image"
                    priority
                    className="w-auto h-auto object-cover"
                    width={400}
                    height={400}
                  />
                ) : (
                  <ImageOff className="w-24 h-24 text-slate-500" />
                )}
              </div>
              <div className="flex absolute left-1/3 top-1/3 items-center justify-center gap-2 p-4 ">
                <Button
                  onClick={() => {
                    document.getElementById("image")?.click();
                  }}
                  type="button"
                >
                  Choose a file
                </Button>
              </div>
            </div>
            <span className="text-sm text-slate-500">
              Format Gambar tidak boleh lebih dari 2MB
            </span>
            <Input
              id="image"
              placeholder="Name"
              {...register("image")}
              type="file"
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              onClick={() => {
                onClose();
              }}
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading || isUpdating}
            >
              {isLoading || isUpdating ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
