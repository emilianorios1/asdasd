import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/app/categories/form";
import { CategoriesTable } from "./table";

export default function CategoriesPage() {
  return (
    <div>

      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Add a new category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryForm></CategoryForm>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex justify-center ">
        <CategoriesTable/>
      </div>
    </div>
  )
}