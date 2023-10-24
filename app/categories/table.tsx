"use client"

import { Category } from "@/interfaces/category"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { CategoriesTableActions } from "./categories-table-actions"

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
      return <CategoriesTableActions category = {category}/>
    },
  },
]


export function CategoriesTable({ categories }: { categories: Category[] }) {
  return <DataTable columns={columns} data={categories} />
}
