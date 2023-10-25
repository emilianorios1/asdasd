import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CategoryForm } from "@/app/categories/form"
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
import { CategoriesTable } from "./table"
import { getCategories } from "@/services/categories"
import { Button } from "@/components/ui/button"

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Categories</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button >Agregar nueva</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add</DialogTitle>
                  <DialogDescription>
                    You are about to add a new category.
                  </DialogDescription>
                </DialogHeader>
                <CategoryForm/>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className=" flex justify-center ">
            <CategoriesTable categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
