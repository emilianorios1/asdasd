"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Brand } from "@/interfaces/backend-interfaces"
import { DataTable } from "@/components/ui/data-table";
import { BoatModel } from "@/interfaces/backend-interfaces"
import { BoatPublication } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DialogBoatPublicationForm } from "./dialog-form";
import { DialogBoatPublicationDelete } from "./dialog-delete";
import { DialogBoatPublicationDetail } from "./dialog-detail";



export function BoatPublicationsDataTable({ publications , models, brands }: { publications: BoatPublication[], models: BoatModel[], brands: Brand[] },){
  const columns: ColumnDef<BoatPublication>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
      accessorKey: "boatModel.name",
      header: "Model"
    },
    {
      accessorKey: "boatModel.brand.name",
      header: "Brand"
    },
    {
      accessorKey: "year",
      header: "Year"
    },
    {
      accessorKey: "boatType",
      header: "Boat Type",
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
      },
    {
      id: "actions",
      cell: ({ row }) => {
        const publication = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogBoatPublicationForm brands={brands} models={models} publication={publication} />
            <DialogBoatPublicationDelete publication={publication} />
            <DialogBoatPublicationDetail publication={publication} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={publications} columns={columns} />
  )
}