"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Brand } from "@/interfaces/backend-interfaces"
import { DataTable } from "@/components/ui/data-table";
import { BoatModel } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DialogBoatModelForm } from "./dialog-form";
import { DialogBoatModelDelete } from "./dialog-delete";
import { DialogBoatModelDetail } from "./dialog-detail";



export function BoatModelsDataTable({ models, brands }: { models: BoatModel[], brands: Brand[] },){
  const columns: ColumnDef<BoatModel>[] = [
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
      accessorKey: "isOutboard",
      header: "Outboard"
    },
    {
      accessorKey: "engineSize",
      header: "Engine Size",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const model = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogBoatModelForm brands={brands} model={model} />
            <DialogBoatModelDelete model={model} />
            <DialogBoatModelDetail model={model} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={models} columns={columns} />
  )
}