import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PublishForm } from "@/app/publish/form"
import { getCategories } from "@/services/dsw-back";

export default async function PublishPage() {
  const categories = await getCategories();
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Publish</CardTitle>
          </CardHeader>
          <CardContent>
            <PublishForm categories = {categories}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
