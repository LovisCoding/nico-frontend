// src/components/image-transfer/transferUtils.js

// Normalise la notion d'identité, pour gérer à la fois:
// - image simple: { id, url, ... }
// - item section-image: { imageId, order, image: { id, url, ... } }
export const getUniqueId = (item) => {
  if (!item) return '';
  if (item.imageId != null) return `section-${item.imageId}`; // item de section
  if (item.id != null) return `image-${item.id}`;             // image simple
  // fallback
  return JSON.stringify(item);
};

export const not = (a, b) => {
  const bIds = new Set(b.map(getUniqueId));
  return a.filter((x) => !bIds.has(getUniqueId(x)));
};

export const intersection = (a, b) => {
  const bIds = new Set(b.map(getUniqueId));
  return a.filter((x) => bIds.has(getUniqueId(x)));
};

export const toDisplayImage = (value) => value?.image || value;
