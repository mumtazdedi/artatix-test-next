import { Loader2 } from "lucide-react";

export function LoadingButton() {
  return (
    <div className="flex items-center ">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Harap tunggu
    </div>
  );
}
