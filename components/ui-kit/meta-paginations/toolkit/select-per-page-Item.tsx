'use client'
import * as React from 'react'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type GenericObjectType = {
  label: string | number
  value: number
}

type SelectPageItemProps = {
  placeholder?: string
  value: number
  onChange: (prop: number) => void
  itemList?: GenericObjectType[]
}

const PER_PAGE_ITEMS: GenericObjectType[] = [
  { label: 10, value: 10 },
  { label: 25, value: 25 },
  { label: 50, value: 50 },
  { label: 75, value: 75 },
  { label: 100, value: 100 }
]

export function SelectPerPageItem({
  placeholder = 'Select Per Page Record',
  value = 25,
  onChange,
  itemList = PER_PAGE_ITEMS
}: SelectPageItemProps) {
  return (
    <div className="flex items-center gap-2 w-[164px]">
      <Label className="text-sm font-medium">Per Page</Label>
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {itemList.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
