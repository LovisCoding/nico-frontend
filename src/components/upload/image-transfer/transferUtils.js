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

export const formatImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("data:")) return url;

  // En dévelopement, on utilise /api/ qui est proxy vers le backend
  // En production, utiliser VITE_API_URL ou le chemin relatif adéquat
  const baseUrl = import.meta.env.DEV ? "/api/" : import.meta.env.VITE_API_URL;

  // On s'assure de ne pas avoir de double slash //
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

  return `${cleanBase}${cleanUrl}`;
};

export const getFilenameFromUrl = (url) => {
  if (!url) return "Sans titre";
  // On récupère la dernière partie après le dernier slash
  const parts = url.split('/');
  return parts[parts.length - 1];
};
