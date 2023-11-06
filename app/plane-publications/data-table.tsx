"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Brand } from "@/interfaces/backend-interfaces"
import { DataTable } from "@/components/ui/data-table";
import { PlaneModel } from "@/interfaces/backend-interfaces"
import { PlanePublication } from "@/interfaces/backend-interfaces"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { DialogPlanePublicationForm } from "./dialog-form";
import { DialogPlanePublicationDelete } from "./dialog-delete";
import { DialogPlanePublicationDetail } from "./dialog-detail";



export function PlanePublicationsDataTable({ publications , models, brands }: { publications: PlanePublication[], models: PlaneModel[], brands: Brand[] },){
  const columns: ColumnDef<PlanePublication>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
      accessorKey: "planeModel.name",
      header: "Model"
    },
    {
      accessorKey: "planeModel.brand.name",
      header: "Brand"
    },
    {
      accessorKey: "year",
      header: "Year"
    },
    {
      accessorKey: "flighthours",
      header: "Flight Hours"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const publication = row.original
        return (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogPlanePublicationForm brands={brands} models={models} publication={publication} />
            <DialogPlanePublicationDelete publication={publication} />
            <DialogPlanePublicationDetail publication={publication} />
          </div>
        )
      },
    },
  ]
  return(
    <DataTable data={publications} columns={columns} />
  )
}