import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { getCarModels } from "@/services/carModels"
import { getBrands } from "@/services/brands";
import { CarModelsDataTable } from "./data-table";
import { DialogCarModelForm } from "./dialog-form";
  
  export default async function Page() {
    const models = await getCarModels();
    const brands = await getBrands();
    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Car Models</CardTitle>
              <DialogCarModelForm brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <CarModelsDataTable models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  