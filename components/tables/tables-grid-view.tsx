"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTables } from "@/hooks/use-tables"
import { EditTableDialog } from "@/components/tables/edit-table-dialog"
import { DeleteTableDialog } from "@/components/tables/delete-table-dialog"
import type { Table } from "@/lib/types"

export default function TablesGridView() {
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [deletingTable, setDeletingTable] = useState<Table | null>(null)
  const { tables, isLoading } = useTables()

  if (isLoading) {
    return <div>Loading tables...</div>
  }

  // Group tables by type
  const vipTables = tables.filter((table) => table.id.startsWith("vip-"))
  const barTables = tables.filter((table) => table.id.startsWith("tb-") || table.id.startsWith("bb-"))
  const boothTables = tables.filter((table) => table.id.startsWith("rb-"))
  const standardTables = tables.filter((table) => table.id.startsWith("lw-"))

  // Group tables by status
  const availableTables = tables.filter((table) => table.status === "available")
  const reservedTables = tables.filter((table) => table.status === "reserved")
  const occupiedTables = tables.filter((table) => table.status === "occupied")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tables ({tables.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableTables.length})</TabsTrigger>
          <TabsTrigger value="reserved">Reserved ({reservedTables.length})</TabsTrigger>
          <TabsTrigger value="occupied">Occupied ({occupiedTables.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <TableSections
            vipTables={vipTables}
            barTables={barTables}
            boothTables={boothTables}
            standardTables={standardTables}
            onEdit={setEditingTable}
            onDelete={setDeletingTable}
          />
        </TabsContent>

        <TabsContent value="available" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableTables.map((table) => (
              <TableCard key={table.id} table={table} onEdit={setEditingTable} onDelete={setDeletingTable} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reserved" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reservedTables.map((table) => (
              <TableCard key={table.id} table={table} onEdit={setEditingTable} onDelete={setDeletingTable} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="occupied" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {occupiedTables.map((table) => (
              <TableCard key={table.id} table={table} onEdit={setEditingTable} onDelete={setDeletingTable} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {editingTable && (
        <EditTableDialog
          open={!!editingTable}
          onOpenChange={(open) => !open && setEditingTable(null)}
          table={editingTable}
        />
      )}

      {deletingTable && (
        <DeleteTableDialog
          open={!!deletingTable}
          onOpenChange={(open) => !open && setDeletingTable(null)}
          table={deletingTable}
        />
      )}
    </div>
  )
}

function TableSections({
  vipTables,
  barTables,
  boothTables,
  standardTables,
  onEdit,
  onDelete,
}: {
  vipTables: Table[]
  barTables: Table[]
  boothTables: Table[]
  standardTables: Table[]
  onEdit: (table: Table) => void
  onDelete: (table: Table) => void
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-3">VIP Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vipTables.map((table) => (
            <TableCard key={table.id} table={table} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Bar Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {barTables.map((table) => (
            <TableCard key={table.id} table={table} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Booth Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boothTables.map((table) => (
            <TableCard key={table.id} table={table} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Standard Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {standardTables.map((table) => (
            <TableCard key={table.id} table={table} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TableCard({
  table,
  onEdit,
  onDelete,
}: { table: Table; onEdit: (table: Table) => void; onDelete: (table: Table) => void }) {
  const statusColors = {
    available: "bg-green-500 text-white",
    occupied: "bg-red-500 text-white",
    reserved: "bg-yellow-500 text-white",
  }

  const tableType = table.id.startsWith("vip-")
    ? "VIP"
    : table.id.startsWith("rb-")
      ? "Booth"
      : table.id.startsWith("tb-") || table.id.startsWith("bb-")
        ? "Bar"
        : "Standard"

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md font-medium">Table {table.number}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(table)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(table)} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <Badge variant="outline" className="mb-2">
              {tableType}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              <span>Capacity: {table.capacity}</span>
            </div>
          </div>
          <Badge className={statusColors[table.status as keyof typeof statusColors]}>
            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

