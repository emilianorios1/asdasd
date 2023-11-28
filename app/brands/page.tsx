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
    <div className=" ">
      <div className=" mt-10 flex justify-center">
        <Card className="min-w-[600px] mx-2 sm:min-w-[620px] md:min-w-min">
          <CardHeader className=" items-center">
            <CardTitle className="text-8xl">Brands</CardTitle>
            <DialogBrandForm/>
          </CardHeader>
          <CardContent className="flex justify-center ">
            <BrandsDataTable brands={brands} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
