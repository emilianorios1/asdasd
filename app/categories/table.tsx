import { Category } from "@/interfaces/category"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { getCategories } from "@/services/dsw-back"

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

export async function CategoriesTable() {
  const data = await getCategories()
  return <DataTable columns={columns} data={data} />
}
