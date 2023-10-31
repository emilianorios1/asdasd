"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DialogmodelForm } from "./dialog-form"
import { DialogmodelDelete } from "./dialog-delete"
import { Brand } from "@/interfaces/brand"
import { DataTable } from "@/components/ui/data-table";
import { CarModel } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"



export function ModelsDataTable({ models, brands }: { models: CarModel[], brands: Brand[] },){
  const columns: ColumnDef<CarModel>[] = [
    {
      accessorKey: "id",
      header: "ID",
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
      accessorKey: "engineSize",
      header: "Engine Size"
    },
    {
      accessorKey: "numberOfDoors",
      header: "Number of Doors",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const model = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogmodelForm brands={brands} model={model} />
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