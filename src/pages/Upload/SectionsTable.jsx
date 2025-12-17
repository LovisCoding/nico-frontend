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
  IconButton,
  Tooltip,
} from "@mui/material";
import api from '../../lib/api.js';
import { PiGear, PiTrash } from "react-icons/pi";

export default function SectionsTable({ rows, onManage, addRow, onDelete }) {
  const [newTitle, setNewTitle] = React.useState("");

  const handleCreate = () => {
    const title = newTitle.trim();
    if (!title) return;
    api.post("/sections", { title }).then((response) => {
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
                <Tooltip title="Gérer">
                  <IconButton color="primary" onClick={() => onManage(row)}>
                    <PiGear />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Supprimer">
                  <IconButton
                    color="error"
                    onClick={() => {
                      if (window.confirm('Voulez-vous vraiment supprimer cette section ?')) {
                        onDelete(row.id)
                      }
                    }}
                  >
                    <PiTrash />
                  </IconButton>
                </Tooltip>
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
