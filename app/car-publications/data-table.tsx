"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Brand } from "@/interfaces/backend-interfaces"
import { DataTable } from "@/components/ui/data-table";
import { CarModel } from "@/interfaces/backend-interfaces"
import { CarPublication } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DialogCarPublicationForm } from "./dialog-form";
import { DialogCarPublicationDelete } from "./dialog-delete";
import { DialogCarPublicationDetail } from "./dialog-detail";



export function CarPublicationsDataTable({ publications , models, brands }: { publications: CarPublication[], models: CarModel[], brands: Brand[] },){
  const columns: ColumnDef<CarPublication>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
      accessorKey: "carModel.name",
      header: "Model"
    },
    {
      accessorKey: "carModel.brand.name",
      header: "Brand"
    },
    {
      accessorKey: "year",
      header: "Year"
    },
    {
      accessorKey: "mileage",
      header: "Mileage",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const publication = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogCarPublicationForm brands={brands} models={models} publication={publication} />
            <DialogCarPublicationDelete publication={publication} />
            <DialogCarPublicationDetail publication={publication} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={publications} columns={columns} />
  )
}