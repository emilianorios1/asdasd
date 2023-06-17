import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form";
import { CategoryForm } from "@/components/category-form";

type Category = {
  id: number
  name: string
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
]

async function getCategories(): Promise<Category[]> {
  const res = await fetch('http://localhost:3001/api/categories', { cache: 'no-store' });
  const data = await res.json();
  console.log(data)
  return data as Category[];
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>

      <div className="mt-10 flex justify-center">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Agregar categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryForm></CategoryForm>
          </CardContent>
        </Card>
      </div>


      <div className="mt-10 flex justify-center ">
        <DataTable columns={columns} data={categories}/>
      </div>
    </div>

    
  )
}