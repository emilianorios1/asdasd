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
import { Category } from "@/interfaces/category";
import { useRouter } from "next/navigation";

export function DialogCategoryDelete({ category }: { category: Category }) {
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${category.id}`,
        {
          method: "DELETE",
        }
      )
      if (response.ok) {
        // Successful deletion
        toast({
          title: "Success",
        });
        router.refresh();
      } else {
        // Handle errors or display an error message to the user
        const data = await response.json();
        toast({
          description: data.error,
          title: "Error",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Handle unexpected errors or display an error message to the user
      console.error("Error deleting category:", error);
      toast({
        description: "Unexepected error",
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
            Are you sure you want to delete category `{category.name}`?<br/><br/>
            This will delete all dependant publications, beware!
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