"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Brand } from "@/interfaces/backend-interfaces"
import { DataTable } from "@/components/ui/data-table";
import { PlaneModel } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DialogPlaneModelForm } from "./dialog-form";
import { DialogPlaneModelDelete } from "./dialog-delete";
import { DialogPlaneModelDetail } from "./dialog-detail";



export function PlaneModelsDataTable({ models, brands }: { models: PlaneModel[], brands: Brand[] },){
  const columns: ColumnDef<PlaneModel>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "brand.name",
      header: "Brand"
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Model Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const model = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogPlaneModelForm brands={brands} model={model} />
            <DialogPlaneModelDelete model={model} />
            <DialogPlaneModelDetail model={model} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={models} columns={columns} />
  )
}