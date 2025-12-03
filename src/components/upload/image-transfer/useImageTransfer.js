// src/components/image-transfer/useImageTransfer.js
import { useEffect, useMemo, useState } from "react";

import { getUniqueId, intersection, not } from "./transferUtils.js";
import api from '../../../lib/api.js';

export default function useImageTransfer({ sectionId, open }) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]);

  const [allImages, setAllImages] = useState([]);
  const [availableImages, setAvailableImages] = useState([]);
  const [sectionImages, setSectionImages] = useState([]);

  const leftChecked = useMemo(
    () => intersection(checked, availableImages),
    [checked, availableImages]
  );
  const rightChecked = useMemo(
    () => intersection(checked, sectionImages),
    [checked, sectionImages]
  );

  const toggle = (value) => {
    const id = getUniqueId(value);
    setChecked((prev) => {
      const idx = prev.findIndex((x) => getUniqueId(x) === id);
      if (idx === -1) return [...prev, value];
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  const transferRight = () => {
    setLoading(true);
    const newSectionItems = leftChecked.map((image, i) => ({
      sectionId,
      imageId: image.id, // placeholder d'ordre stable
      image,
    }));
    const requests = api
      .post("/sections-images", {
        sectionId,
        imageIds: newSectionItems.map(({ imageId }) => (imageId )),
      })
      .then((res) => {
        const created = res.data ?? [];
        const createdByImageId = new Map(created.map((c) => [c.imageId, c]));
        newSectionItems.forEach((it) => {
          const c = createdByImageId.get(it.imageId);
          if (c) {
            it.id = c.id;
            it.order = c.order;
          }
        });
      });

    requests
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de l'envoi des images:", err);
        setLoading(false);
      });

    setSectionImages((prev) =>
      [...prev, ...newSectionItems].sort((a, b) => a.order - b.order)
    );
    setAvailableImages((prev) => not(prev, leftChecked));
    setChecked((prev) => not(prev, leftChecked));
  };

  const transferLeft = () => {
    setLoading(true);
    const imagesToMoveBack = rightChecked.map((item) => item.image);
    const requests = rightChecked.map((item) =>
      api.delete(`/sections-images/${sectionId}/${item.imageId}`)
    );
    Promise.all(requests)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression des images:", err);
        setLoading(false);
      });

    setAvailableImages((prev) => [...prev, ...imagesToMoveBack]);
    setSectionImages((prev) => not(prev, rightChecked));
    setChecked((prev) => not(prev, rightChecked));
  };

  useEffect(() => {
    if (!open) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const [allResponse, sectionResponse] = await Promise.all([
          api.get("images"),
          api.get(`sections-images/${sectionId}`),
        ]);

        const all = allResponse.data ?? [];
        const section = sectionResponse.data ?? [];

        setAllImages(all);
        const sortedSection = [...section].sort((a, b) => a.order - b.order);
        setSectionImages(sortedSection);

        const sectionImageIds = new Set(sortedSection.map((x) => x.imageId));
        const available = all.filter((img) => !sectionImageIds.has(img.id));
        setAvailableImages(available);

        // reset selection à l'ouverture (évite les incohérences)
        setChecked([]);
      } catch (error) {
        console.error("Erreur lors du chargement des images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [open, sectionId]);

  const ORDER_STEP = 1000;
  const reindexOrders = (items) =>
    items.map((it, idx) => ({ ...it, order: (idx + 1) * ORDER_STEP }));


  const moveRightItemUp = (index) => {
    setSectionImages((prev) => {
      if (index <= 0 || index >= prev.length) return prev;
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      const newItems = reindexOrders(copy);

      // Mise à jour optimiste + appel PATCH pour persister l'ordre
      const betweenSectionImages = newItems.map((it) => it.id);
      const idImageToChangeOrder = newItems[index - 1]?.id;

      setLoading(true);
      api
        .patch("sections-images/", {
          idSection: sectionId,
          betweenSectionImages,
          idImageToChangeOrder,
        })
        .then(() => setLoading(false))
        .catch((err) => {
          console.error("Erreur lors du reordonnancement:", err);
          setLoading(false);
        });

      return newItems;
    });
  };


const moveRightItemDown = (index) => {
  setSectionImages((prev) => {
    if (index < 0 || index >= prev.length - 1) return prev;
    const copy = [...prev];
    [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
    const newItems = reindexOrders(copy);

    // Mise à jour optimiste + appel PATCH pour persister l'ordre
    const betweenSectionImages = newItems.map((it) => it.id);
    const idImageToChangeOrder = newItems[index + 1]?.id;

    setLoading(true);
    api
      .patch("sections-images/", {
        idSection: sectionId,
        betweenSectionImages,
        idImageToChangeOrder,
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Erreur lors du reordonnancement:", err);
        setLoading(false);
      });

    return newItems;
  });
};

  return {
    loading,
    allImages, // si tu en as besoin plus tard
    checked,
    availableImages,
    sectionImages,
    leftChecked,
    rightChecked,
    toggle,
    transferRight,
    transferLeft,
    setChecked, // optionnel
    setAvailableImages, // optionnel
    setSectionImages, // optionnel
    moveRightItemUp,
    moveRightItemDown,
  };
}
