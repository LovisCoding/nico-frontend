// src/components/image-transfer/ImageTransferDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";

import useImageTransfer from "./useImageTransfer.js";
import ImageTransferList from "./ImageTransferList.jsx";
import SectionImagesReorderList from './SectionImagesReorderList.jsx';

export default function ImageTransferDialog({ sectionId, open, onClose, onSave }) {
  const {
    loading,
    checked,
    availableImages,
    sectionImages,
    leftChecked,
    rightChecked,
    toggle,
    transferRight,
    transferLeft,
    moveRightItemDown,
    moveRightItemUp,
  } = useImageTransfer({ sectionId, open });

  const handleCancel = () => onClose?.();

  const handleSave = async () => {
    // on envoie uniquement ce qui est côté "section", en gardant order
    const payload = sectionImages.map((item) => ({
      sectionId: item.sectionId ?? sectionId,
      imageId: item.imageId,
      order: item.order,
    }));

    // Option 1: tu gères la sauvegarde depuis le parent
    if (onSave) {
      await onSave(payload, sectionId);
      onClose?.();
      return;
    }

    // Option 2: à brancher si tu préfères sauvegarder ici (commenté volontairement)
    // await api.put(`sections-images/${sectionId}`, payload);
    // onClose?.();

    console.warn("Aucun onSave fourni : payload prêt mais non envoyé.", payload);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Gérer les images de la section {sectionId}</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <ImageTransferList
                title="Images Disponibles"
                items={availableImages}
                checked={checked}
                onToggle={toggle}
              />
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={transferRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={transferLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <SectionImagesReorderList
                title="Images de la Section (Ordre)"
                items={sectionImages}
                checked={checked}
                onToggle={toggle}
                onMoveUp={moveRightItemUp}
                onMoveDown={moveRightItemDown}
                showOrder
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCancel} color="inherit">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
