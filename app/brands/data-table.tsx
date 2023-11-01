"use client"

import { Brand } from "@/interfaces/backend-interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { DialogBrandForm } from "./dialog-form"
import { DialogBrandDelete } from "./dialog-delete"
import { DialogBrandDetail } from "./dialog-detail"
import { DataTable } from "@/components/ui/data-table"

export function BrandsDataTable({ brands }: { brands: Brand[] }){

  const columns: ColumnDef<Brand>[] = [
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
            <DialogBrandDetail brand={brand} />
          </div>
        )
      },
    },
  ]
  
  return(
    <DataTable data={brands} columns={columns} />
  )

}
