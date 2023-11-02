import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { getBoatModels } from "@/services/boatModels"
import { getBrands } from "@/services/brands";
import { BoatModelsDataTable } from "./data-table";
import { DialogBoatModelForm } from "./dialog-form";
  
  export default async function Page() {
    const models = await getBoatModels();
    const brands = await getBrands();
    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Boat Engines</CardTitle>
              <DialogBoatModelForm brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <BoatModelsDataTable models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  