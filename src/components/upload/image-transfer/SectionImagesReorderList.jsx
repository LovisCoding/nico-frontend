import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { getUniqueId } from "./transferUtils.js";
import SortableSectionImageItem from "./SortableSectionImageItem.jsx";

export default function SectionImagesReorderList({
  title,
  items,
  checked,
  onToggle,
  onReorder,
  showOrder = true,
  width = 300,
  height = 400,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => getUniqueId(item) === active.id);
      const newIndex = items.findIndex((item) => getUniqueId(item) === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  }

  return (
    <Card>
      <CardHeader sx={{ px: 2, py: 1 }} title={title} />
      <Divider />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <List
          sx={{ width, height, bgcolor: "background.paper", overflowY: "auto", overflowX: "hidden" }}
          dense
          component="div"
          role="list"
        >
          <SortableContext
            items={items.map(getUniqueId)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((value) => (
              <SortableSectionImageItem
                key={getUniqueId(value)}
                item={value}
                checked={checked}
                onToggle={onToggle}
                showOrder={showOrder}
              />
            ))}
          </SortableContext>
          <ListItem />
        </List>
      </DndContext>
    </Card>
  );
}
