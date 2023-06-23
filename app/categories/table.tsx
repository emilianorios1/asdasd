import { Category } from "@/interfaces/category"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"

const columns: ColumnDef<Category>[] = [
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
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/categories",
    { cache: "no-store" }
  )
  const data = await res.json()
  return data as Category[]
}

export async function CategoriesTable() {
  const data = await getCategories()
  return <DataTable columns={columns} data={data} />
}
