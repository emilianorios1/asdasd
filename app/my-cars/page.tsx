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
import { getBrands } from "@/services/brands";
import { getModels } from "@/services/models";

export default async function MyCarsPage() {
  const brands = await getBrands()
  const models = await getModels()
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Cars</CardTitle>
            <DialogCarForm brands={brands} models={models}/>
          </CardHeader>
          <CardContent className=" flex justify-center ">
          </CardContent>
        </Card>
      </div>
    </div>
  )
}