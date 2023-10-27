import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Model } from "@/interfaces/model"; // Asegúrate de importar la interfaz correcta
import { useRouter } from "next/navigation";

export function DialogmodelDelete({ model }: { model: Model }) {
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/models/${model.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Eliminación exitosa
        toast({
          title: "Success",
        });
        router.refresh();
      } else {
        // Manejar errores o mostrar un mensaje de error al usuario
        const data = await response.json();
        toast({
          description: data.error,
          title: "Error",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Manejar errores inesperados o mostrar un mensaje de error al usuario
      console.error("Error deleting model:", error);
      toast({
        description: "Unexpected error",
        title: "Error",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete model `{model.name}`?<br/><br/>
            This action will delete associated data, please be cautious!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleOnClick}>Delete</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
