// src/components/image-transfer/ImageTransferList.jsx
import React from "react";
import { Card, CardHeader, Divider, List, ListItem, ListItemIcon, ListItemText, Checkbox } from "@mui/material";
import { getUniqueId, toDisplayImage } from "./transferUtils.js";

export default function ImageTransferList({
                                            title,
                                            items,
                                            checked,
                                            onToggle,
                                            showOrder = false,
                                            width = 300,
                                            height = 400,
                                          }) {
  return (
    <Card>
      <CardHeader sx={{ px: 2, py: 1 }} title={title} />
      <Divider />
      <List
        sx={{
          width,
          height,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const uniqueId = getUniqueId(value);
          const labelId = `transfer-list-item-${uniqueId}-label`;
          const isChecked = checked.some((x) => getUniqueId(x) === uniqueId);
          const image = toDisplayImage(value);

          return (
            <ListItem key={uniqueId} role="listitem" onClick={() => onToggle(value)} >
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
