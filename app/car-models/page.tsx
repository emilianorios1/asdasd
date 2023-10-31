import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { DialogmodelForm } from "@/app/models/dialog-form"
  import { getCarModels } from "@/services/carModels"
import { getBrands } from "@/services/brands";
import { ModelsDataTable } from "./data-table";
  
  export default async function CategoriesPage() {
    const models = await getCarModels();
    const brands = await getBrands();


    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>models</CardTitle>
              <DialogmodelForm brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <ModelsDataTable models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  