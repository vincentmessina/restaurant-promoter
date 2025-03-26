"use client"

import type React from "react"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Music, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTables } from "@/hooks/use-tables"
import { EditTableDialog } from "@/components/tables/edit-table-dialog"
import { DeleteTableDialog } from "@/components/tables/delete-table-dialog"
import type { Table } from "@/lib/types"

export default function TablesGrid() {
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [deletingTable, setDeletingTable] = useState<Table | null>(null)
  const { tables, isLoading } = useTables()

  if (isLoading) {
    return <div>Loading tables...</div>
  }

  const getTableById = (id: string) => {
    return tables.find((table) => table.id === id)
  }

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] bg-black rounded-lg overflow-hidden border border-neutral-800">
      {/* Floor grid lines for visual reference */}
      <div className="absolute inset-0 bg-grid-neutral-950/20"></div>

      {/* Top bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[300px] h-[60px] bg-neutral-800 rounded-md flex items-center justify-center">
        <span className="text-white font-bold">BAR</span>
      </div>

      {/* Top bar seating */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[400px] flex justify-between">
        {[...Array(7)].map((_, i) => (
          <TableCircle
            key={`top-bar-${i}`}
            size="sm"
            id={`tb-${i + 1}`}
            table={getTableById(`tb-${i + 1}`)}
            onEdit={setEditingTable}
            onDelete={setDeletingTable}
          />
        ))}
      </div>

      {/* DJ Booth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[80px] bg-neutral-900 rounded-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
        <Music className="text-white mr-2" size={20} />
        <span className="text-white font-bold">DJ</span>
      </div>

      {/* Dance floor indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] border border-neutral-800 rounded-md opacity-30"></div>

      {/* VIP Tables around DJ - more logically placed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px]">
        {/* Top left */}
        <TableRect
          style={{ top: "-120px", left: "-180px" }}
          id="vip-1"
          table={getTableById("vip-1")}
          onEdit={setEditingTable}
          onDelete={setDeletingTable}
        />
        {/* Top right */}
        <TableRect
          style={{ top: "-120px", right: "-180px" }}
          id="vip-2"
          table={getTableById("vip-2")}
          onEdit={setEditingTable}
          onDelete={setDeletingTable}
        />
        {/* Bottom left */}
        <TableRect
          style={{ bottom: "-120px", left: "-180px" }}
          id="vip-3"
          table={getTableById("vip-3")}
          onEdit={setEditingTable}
          onDelete={setDeletingTable}
        />
        {/* Bottom right */}
        <TableRect
          style={{ bottom: "-120px", right: "-180px" }}
          id="vip-4"
          table={getTableById("vip-4")}
          onEdit={setEditingTable}
          onDelete={setDeletingTable}
        />
      </div>

      {/* Bottom bar - larger */}
      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[350px] h-[180px] bg-neutral-800 rounded-md flex items-center justify-center">
        <span className="text-white font-bold">BAR</span>
      </div>

      {/* Bottom bar seating */}
      <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[400px] flex justify-between">
        {[...Array(7)].map((_, i) => (
          <TableCircle
            key={`bottom-bar-${i}`}
            size="sm"
            id={`bb-${i + 1}`}
            table={getTableById(`bb-${i + 1}`)}
            onEdit={setEditingTable}
            onDelete={setDeletingTable}
          />
        ))}
      </div>

      {/* Left wall seating - evenly spaced */}
      <div className="absolute left-6 top-0 h-full flex flex-col justify-center">
        <div className="space-y-8">
          {[...Array(6)].map((_, i) => (
            <TableCircle
              key={`left-wall-${i}`}
              size="sm"
              id={`lw-${i + 1}`}
              table={getTableById(`lw-${i + 1}`)}
              onEdit={setEditingTable}
              onDelete={setDeletingTable}
            />
          ))}
        </div>
      </div>

      {/* Right wall booths - evenly spaced */}
      <div className="absolute right-6 top-0 h-full flex flex-col justify-center">
        <div className="space-y-16">
          {[...Array(4)].map((_, i) => (
            <div key={`right-booth-${i}`} className="relative">
              <div className="absolute right-0 w-[40px] h-[60px] bg-neutral-800 rounded-l-md"></div>
              <TableCircle
                size="md"
                style={{ right: "60px" }}
                id={`rb-${i + 1}`}
                table={getTableById(`rb-${i + 1}`)}
                onEdit={setEditingTable}
                onDelete={setDeletingTable}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs text-white">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span className="text-xs text-white">Occupied</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span className="text-xs text-white">Reserved</span>
        </div>
      </div>

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

interface TableCircleProps {
  size?: "sm" | "md" | "lg"
  style?: React.CSSProperties
  id: string
  table?: Table | null
  onEdit: (table: Table) => void
  onDelete: (table: Table) => void
}

function TableCircle({ size = "md", style, id, table, onEdit, onDelete }: TableCircleProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const statusColors = {
    available: "bg-green-500",
    occupied: "bg-red-500",
    reserved: "bg-yellow-500",
  }

  // If we don't have table data, show as available
  const status = table?.status || "available"

  return (
    <div
      className={cn(
        "rounded-full relative flex items-center justify-center cursor-pointer transition-all",
        sizeClasses[size],
        statusColors[status as keyof typeof statusColors],
        "hover:ring-2 hover:ring-white",
      )}
      style={style}
    >
      {table && (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full h-full rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{table.number}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2 py-1.5 text-sm">
              <div className="font-medium">Table {table.number}</div>
              <div className="text-xs text-muted-foreground">Capacity: {table.capacity}</div>
            </div>
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
      )}
    </div>
  )
}

interface TableRectProps {
  style?: React.CSSProperties
  id: string
  table?: Table | null
  onEdit: (table: Table) => void
  onDelete: (table: Table) => void
}

function TableRect({ style, id, table, onEdit, onDelete }: TableRectProps) {
  const statusColors = {
    available: "bg-green-500",
    occupied: "bg-red-500",
    reserved: "bg-yellow-500",
  }

  // If we don't have table data, show as available
  const status = table?.status || "available"

  return (
    <div
      className={cn(
        "absolute w-[80px] h-[60px] rounded-md flex items-center justify-center cursor-pointer transition-all",
        statusColors[status as keyof typeof statusColors],
        "hover:ring-2 hover:ring-white",
      )}
      style={style}
    >
      {table && (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full h-full rounded-md flex items-center justify-center">
            <span className="text-sm font-bold text-white">VIP {table.number}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2 py-1.5 text-sm">
              <div className="font-medium">VIP Table {table.number}</div>
              <div className="text-xs text-muted-foreground">Capacity: {table.capacity}</div>
            </div>
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
      )}
    </div>
  )
}

