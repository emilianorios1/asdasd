"use client"

import { Model } from "@/interfaces/model"
import { ColumnDef } from "@tanstack/react-table"
import { DialogmodelForm } from "./dialog-form"
import { DialogmodelDelete } from "./dialog-delete"
import { getBrands } from "@/services/brands"
import { Brand } from "@/interfaces/brand"
import { DataTable } from "@/components/ui/data-table";



export function ModelsDataTable({ models, brands }: { models: Model[], brands: Brand[] },){
  const columns: ColumnDef<Model>[] = [
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
        const model = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogmodelForm brands= {brands} model={model} />
            <DialogmodelDelete model={model} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={models} columns={columns} />
  )
}