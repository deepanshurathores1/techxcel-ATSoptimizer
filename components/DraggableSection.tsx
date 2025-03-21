"use client"

import { useDrag, useDrop } from "react-dnd"
import { Button } from "@/components/ui/button"

interface DraggableSectionProps {
  id: string
  title: string
  index: number
  moveSection: (dragIndex: number, hoverIndex: number) => void
  setActiveTab: (id: string) => void
  isActive: boolean
}

export default function DraggableSection({
  id,
  title,
  index,
  moveSection,
  setActiveTab,
  isActive,
}: DraggableSectionProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "SECTION",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "SECTION",
    hover(item: { id: string; index: number }) {
      if (item.index !== index) {
        moveSection(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Button
        variant={isActive ? "default" : "outline"}
        className="justify-start w-full mb-2"
        onClick={() => setActiveTab(id)}
      >
        {title}
      </Button>
    </div>
  )
}

