// src/components/image-transfer/SectionImagesReorderList.jsx
import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Stack,
} from "@mui/material";


import { getUniqueId, toDisplayImage } from "./transferUtils.js";
import { PiArrowDown, PiArrowUp } from 'react-icons/pi';

export default function SectionImagesReorderList({
                                                   title,
                                                   items,
                                                   checked,
                                                   onToggle,
                                                   onMoveUp,
                                                   onMoveDown,
                                                   showOrder = true,
                                                   width = 300,
                                                   height = 400,
                                                 }) {
  return (
    <Card>
      <CardHeader sx={{ px: 2, py: 1 }} title={title} />
      <Divider />
      <List
        sx={{ width, height, bgcolor: "background.paper", overflow: "auto" }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, index) => {
          const uniqueId = getUniqueId(value);
          const labelId = `transfer-list-item-${uniqueId}-label`;
          const isChecked = checked.some((x) => getUniqueId(x) === uniqueId);
          const image = toDisplayImage(value);

          return (
            <ListItem
              key={uniqueId}
              role="listitem"
              onClick={() => onToggle(value)}
              button
              secondaryAction={
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveUp(index);
                    }}
                    disabled={index === 0}
                    aria-label="move up"
                  >
                    <PiArrowUp/>
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveDown(index);
                    }}
                    disabled={index === items.length - 1}
                    aria-label="move down"
                  >
                    <PiArrowDown/>
                  </IconButton>
                </Stack>
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={isChecked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>

              <ListItemText
                id={labelId}
                primary={
                  <>
                    {showOrder && (
                      <span style={{ fontWeight: 700, marginRight: 8 }}>
                        {value.order}
                      </span>
                    )}
                    {image?.url}
                  </>
                }
                secondary={image?.title || `ID: ${image?.id}`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
}
