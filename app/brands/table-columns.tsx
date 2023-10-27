"use client"

import { Brand } from "@/interfaces/brand"
import { ColumnDef } from "@tanstack/react-table"
import { DialogBrandForm } from "./dialog-form"
import { DialogBrandDelete } from "./dialog-delete"

export const columns: ColumnDef<Brand>[] = [
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
      const brand = row.original
      return (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogBrandForm brand={brand} />
          <DialogBrandDelete brand={brand} />
        </div>
      )
    },
  },
]
