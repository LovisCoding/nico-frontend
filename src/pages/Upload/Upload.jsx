import * as React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, CircularProgress, Box, Typography, LinearProgress } from '@mui/material';
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

  const [uploadStatus, setUploadStatus] = React.useState({
    loading: false,
    currentFileIndex: 0,
    totalFiles: 0,
    currentFileName: "",
    progress: 0,
  });

  React.useEffect(() => {
    api.get("sections/").then((res) => setRows(res.data));
  }, []);

  const handleManage = (section) => {
    setSelectedSection(section);
    setOpenTransferList(true);
  };
  const handleCloseTransferList = () => {
    setOpenTransferList(false);
    setSelectedSection(null);
  }

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadStatus({
      loading: true,
      currentFileIndex: 0,
      totalFiles: files.length,
      currentFileName: "",
      progress: 0,
    });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Update status for current file
        setUploadStatus(prev => ({
          ...prev,
          currentFileIndex: i + 1,
          currentFileName: file.name,
          progress: 0
        }));

        const formData = new FormData();
        formData.append("image", file);

        await api.post("/images", formData, {

          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadStatus(prev => ({
              ...prev,
              progress: percentCompleted
            }));
          },
        });
      }
    } catch (error) {
      console.error("Upload failed", error);
      // Optional: show error toast
    } finally {
      // Small delay to show completion before resetting
      setTimeout(() => {
        setUploadStatus({
          loading: false,
          currentFileIndex: 0,
          totalFiles: 0,
          currentFileName: "",
          progress: 0,
        });
      }, 500);
    }
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


  if (loading || uploadStatus.loading) {
    return (
      <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center", padding: 50, height: '100%' }}>
        {uploadStatus.loading ? (
          <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Envoi des images en cours...
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Image {uploadStatus.currentFileIndex} sur {uploadStatus.totalFiles} : {uploadStatus.currentFileName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={uploadStatus.progress} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${uploadStatus.progress}%`}</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }

  return (
    <Stack spacing={2} padding={2} display="flex" justifyContent="center" alignItems="center" >
      <ImageTransferDialog
        open={openTransferList}
        sectionId={selectedSection?.id}
        sectionTitle={selectedSection?.title}
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
