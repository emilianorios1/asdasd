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
import { DialogCarPublicationForm } from "./dialog-form";
import { getCarPublications } from "@/services/carPublications";
import { CarPublicationsDataTable } from "./data-table";
  
  export default async function Page() {
    const models = await getCarModels()
    const brands = await getBrands()
    const publications = await getCarPublications()

    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Car Publications</CardTitle>
              <DialogCarPublicationForm models={models} brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <CarPublicationsDataTable publications={publications} models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  