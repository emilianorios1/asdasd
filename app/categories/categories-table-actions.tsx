"use client"
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
} from "@/components/ui/dialog"
import { Category } from "@/interfaces/category";
import { deleteCategory } from "@/services/categories";
import { useRouter } from "next/navigation"
import { CategoryForm } from "./form";

export function CategoriesTableActions({ category }: { category: Category }) {
  const router = useRouter()
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete category `{category.name}`
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={async () => {
                  await deleteCategory(category.id);
                  router.refresh();
                }}
                type="button"
                variant="destructive"
              >
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>
              You are about to edit `{category.name}`
            </DialogDescription>
          </DialogHeader>
          <CategoryForm category={category}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}