"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Brand } from "@/interfaces/backend-interfaces"
import { DataTable } from "@/components/ui/data-table";
import { CarModel } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DialogCarModelForm } from "./dialog-form";
import { DialogCarModelDelete } from "./dialog-delete";
import { DialogCarModelDetail } from "./dialog-detail";



export function CarModelsDataTable({ models, brands }: { models: CarModel[], brands: Brand[] },){
  const columns: ColumnDef<CarModel>[] = [
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
            <DialogCarModelForm brands={brands} model={model} />
            <DialogCarModelDelete model={model} />
            <DialogCarModelDetail model={model} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={models} columns={columns} />
  )
}