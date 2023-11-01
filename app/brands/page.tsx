import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogBrandForm } from "@/app/brands/dialog-form"
import { getBrands } from "@/services/brands"
import { DataTable } from "@/components/ui/data-table";
import { BrandsDataTable } from "./data-table";

export default async function CategoriesPage() {
  const brands = await getBrands();
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Brands</CardTitle>
            <DialogBrandForm/>
          </CardHeader>
          <CardContent className=" flex justify-center ">
          <BrandsDataTable brands={brands} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
