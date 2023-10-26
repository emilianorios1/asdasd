"use client"

import { Category } from "@/interfaces/category"
import { ColumnDef } from "@tanstack/react-table"
import { DialogCategoryForm } from "./dialog-form"
import { DialogCategoryDelete } from "./dialog-delete"

 
export const columns: ColumnDef<Category>[] = [
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
      return (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogCategoryForm category = {category}/>
          <DialogCategoryDelete category = {category}/>
        </div>
      )
    },
  },
]