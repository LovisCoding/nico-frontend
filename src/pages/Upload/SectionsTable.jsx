import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableFooter,
  TextField,
  Box,
} from "@mui/material";
import api from '../../lib/api.js';

export default function SectionsTable({ rows, onManage, addRow }) {
  const [newTitle, setNewTitle] = React.useState("");

  const handleCreate = () => {
    const title = newTitle.trim();
    if (!title) return;
    api.post("/sections", {title}).then((response) => {
      const newSection = response.data;
      addRow(newSection);
    })
    setNewTitle("");
  };

  return (
    <TableContainer component={Paper} sx={{ width: 600, mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" onClick={() => onManage(row)}>
                  Gérer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center", py: 1 }}>
                <TextField
                  size="small"
                  label="Titre de la section"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                  }}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  disabled={!newTitle.trim()}
                >
                  Ajouter
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
