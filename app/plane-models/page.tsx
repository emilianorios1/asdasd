import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { getPlaneModels } from "@/services/planeModels"
import { getBrands } from "@/services/brands";
import { PlaneModelsDataTable } from "./data-table";
import { DialogPlaneModelForm } from "./dialog-form";
  
  export default async function Page() {
    const models = await getPlaneModels();
    const brands = await getBrands();
    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Plane Models</CardTitle>
              <DialogPlaneModelForm brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <PlaneModelsDataTable models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  