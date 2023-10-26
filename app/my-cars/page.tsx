import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogCategoryForm } from "@/app/categories/dialog-form"
import { getCategories } from "@/services/categories"
import { DataTable } from "@/components/ui/data-table";
import { DialogCarForm } from "./dialog-form";

export default async function CategoriesPage() {
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Categories</CardTitle>
            <DialogCarForm/>
          </CardHeader>
          <CardContent className=" flex justify-center ">
          </CardContent>
        </Card>
      </div>
    </div>
  )
}