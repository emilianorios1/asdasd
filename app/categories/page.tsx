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
import { columns } from "./table-columns";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Categories</CardTitle>
            <DialogCategoryForm/>
          </CardHeader>
          <CardContent className=" flex justify-center ">
            <DataTable data={categories} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
