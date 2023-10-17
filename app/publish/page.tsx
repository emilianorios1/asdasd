import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PublishForm } from "@/app/publish/form"

export default function PublishPage() {
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Publish</CardTitle>
          </CardHeader>
          <CardContent>
            <PublishForm></PublishForm>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
