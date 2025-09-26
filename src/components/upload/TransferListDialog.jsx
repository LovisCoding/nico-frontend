import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const initialItems = [
  { id: 4, title: "Accueil" },
  { id: 5, title: "Shooting 1" },
  { id: 6, title: "Shooting 2" },
  { id: 7, title: "Shooting 3" },
];

function not(a, b) {
  return a.filter((value) => !b.some((v) => v.id === value.id));
}

function intersection(a, b) {
  return a.filter((value) => b.some((v) => v.id === value.id));
}

export default function TransferListDialog() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(initialItems);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex((v) => v.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card sx={{ width: 250, height: 300 }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={title}
        subheader={`${items.length} items`}
      />
      <Divider />
      <List
        sx={{
          width: "100%",
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
      >
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;

          return (
            <ListItem
              key={item.id}
              role="listitem"
              button
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.some((v) => v.id === item.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.title} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid size={{xs: 4, md:5}}>{customList("Disponible", left)}</Grid>
      <Grid size={{xs:4,md:2}}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
          >
            ≫
          </Button>
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 1 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid size={{xs:4, md:5}}>{customList("Sélectionné", right)}</Grid>
    </Grid>
  );
}

