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
import { DialogPlanePublicationForm } from "./dialog-form";
import { getPlanePublications } from "@/services/planePublications";
import { PlanePublicationsDataTable } from "./data-table";
  
  export default async function Page() {
    const models = await getPlaneModels()
    const brands = await getBrands()
    const publications = await getPlanePublications()

    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Plane Publications</CardTitle>
              <DialogPlanePublicationForm models={models} brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <PlanePublicationsDataTable publications={publications} models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  