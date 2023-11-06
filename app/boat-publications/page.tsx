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
import { DialogBoatPublicationForm } from "./dialog-form";
import { getBoatPublications } from "@/services/boatPublications";
import { BoatPublicationsDataTable } from "./data-table";
  
  export default async function Page() {
    const models = await getBoatModels()
    const brands = await getBrands()
    const publications = await getBoatPublications()

    return (
      <div>
        <div className="mt-10 flex justify-center">
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Boat Publications</CardTitle>
              <DialogBoatPublicationForm models={models} brands={brands}/>
            </CardHeader>
            <CardContent className="flex justify-center ">
              <BoatPublicationsDataTable publications={publications} models={models} brands={brands} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  