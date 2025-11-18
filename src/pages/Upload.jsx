import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { useEffect } from 'react';
import { PiUploadSimple } from 'react-icons/pi';
import api from '../lib/api.js';
import TransferListDialog from '../components/upload/TransferListDialog.jsx';

export default function Upload() {
const [rows, setRows] = React.useState([]);

  const [selectedRow, setSelectedRow] = React.useState(null); // id de la ligne sélectionnée
  const [editingRow, setEditingRow] = React.useState(null); // id de la ligne en édition
  const [editValues, setEditValues] = React.useState({}); // valeurs temporaires

  const [open, setOpen] = React.useState(false);
  const handleSelectRow = (id) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    if (selectedRow === id) setSelectedRow(null);
  };

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditValues(row);
  };

  const handleSave = () => {
    setRows(
      rows.map((row) =>
        row.id === editingRow ? { ...row, ...editValues } : row
      )
    );
    setEditingRow(null);
    setEditValues({});
  };

  useEffect(() => {
    api.get('sections/').then((res) => setRows(res.data))
  }, []);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" >
        <DialogTitle>Upload des images</DialogTitle>
        <DialogContent>
          <Button component="label">
            Sélectionner les fichiers
            <input type="file" hidden multiple />
          </Button>
          <TransferListDialog/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={() => setOpen(false)}>Créer</Button>
        </DialogActions>

      </Dialog>
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<PiUploadSimple />}
      onClick={() => setOpen(true)}
    >Upload fichiers
    </Button>
    <TableContainer component={Paper} sx={{width: '600px'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sélection</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Titre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              selected={row.id === selectedRow}
            >
              {/* Checkbox de sélection */}
              <TableCell>
                <Checkbox
                  checked={row.id === selectedRow}
                  onChange={() => handleSelectRow(row.id)}
                />
              </TableCell>

              <TableCell>{row.id}</TableCell>

              {/* Nom (édition inline si en mode édition) */}
              <TableCell>
                {editingRow === row.id ? (
                  <TextField
                    value={editValues.title}
                    onChange={(e) =>
                      setEditValues({ ...editValues, title: e.target.value })
                    }
                    size="small"
                  />
                ) : (
                  row.title
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
