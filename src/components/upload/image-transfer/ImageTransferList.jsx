// src/components/image-transfer/ImageTransferList.jsx
import React from "react";
import { Card, CardHeader, Divider, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, ListItemAvatar, Avatar } from "@mui/material";
import { PiTrash } from "react-icons/pi";
import { getUniqueId, toDisplayImage, formatImageUrl, getFilenameFromUrl } from "./transferUtils.js";

export default function ImageTransferList({
  title,
  items,
  checked,
  onToggle,
  showOrder = false,
  width = 300,
  height = 400,
  onDelete,
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

              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={formatImageUrl(image?.url)}
                  alt={image?.title}
                  sx={{ width: 50, height: 50, mr: 1, borderRadius: 1 }}
                />
              </ListItemAvatar>

              <ListItemText
                id={labelId}
                primary={
                  <>
                    {showOrder && (
                      <span style={{ fontWeight: 700, marginRight: 8 }}>
                        {value.order}
                      </span>
                    )}
                    {getFilenameFromUrl(image?.url)}
                  </>
                }
              />
              {onDelete && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Attention cela va supprimer cette image pour toutes les sections")) {
                      onDelete(image.id);
                    }
                  }}
                >
                  <PiTrash />
                </IconButton>
              )}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
}
