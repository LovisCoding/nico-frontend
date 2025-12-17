import * as React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, CircularProgress } from '@mui/material';
import { PiUploadSimple } from "react-icons/pi";
import api from "../../lib/api.js";
import SectionsTable from "./SectionsTable.jsx";
import TransferListDialog from "../../components/upload/TransferListDialog.jsx";
import ImageTransferDialog from '../../components/upload/image-transfer/ImageTransferDIalog.jsx';
import Loader from '../../components/Loader.jsx';


export default function Upload() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openTransferList, setOpenTransferList] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    api.get("sections/").then((res) => setRows(res.data));
  }, []);

  const handleManage = (section) => {
    // Tu peux ouvrir une modal, set un state "selectedSection", etc.
    setSelectedSection(section.id);
    setOpenTransferList(true);
  };
  const handleCloseTransferList = () => {
    setOpenTransferList(false);
    setSelectedSection(null);
  }
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    setLoading(true);
    const uploadPromises = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i]);

      uploadPromises.push(
        api.post("/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );
    }

    Promise.all(uploadPromises).finally(() => setLoading(false));
  }
  const addRow = (newSection) => {
    setRows((prevRows) => [...prevRows, newSection]);
  }

  const deleteRow = (id) => {
    setLoading(true);
    api.delete(`sections/${id}`).then(() => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }).finally(() => setLoading(false));
  };


  return loading ? (
    <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
      <CircularProgress />
    </div>
  ) : (
    <Stack spacing={2} padding={2} display="flex" justifyContent="center" alignItems="center" >
      <ImageTransferDialog
        open={openTransferList}
        sectionId={selectedSection}
        onClose={handleCloseTransferList}
      />

      <Button
        variant="contained"
        startIcon={<PiUploadSimple />}
        component="label"
      >
        <input type={"file"} accept={"image/*"} hidden onChange={handleFileChange} multiple />
        Upload Images
      </Button>
      <SectionsTable rows={rows} onManage={handleManage} addRow={addRow} onDelete={deleteRow} />

    </Stack>
  );
}
