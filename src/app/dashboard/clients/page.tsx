'use client'

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react"

type Client = {
  id: number
  name: string
  pan: string
}

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "pan",
    header: "PAN",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("pan")}</div>
    ),
  }
]

export default function Home() {
  const [clientsData, setClientsData] = useState<Client[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/showClients')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setClientsData(res.clients)
      })
      .catch(console.error);

  }, [])

  return <DataTable columns={columns} data={clientsData} />;
}
