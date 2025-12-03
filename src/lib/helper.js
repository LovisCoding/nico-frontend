// Retourne les éléments de 'a' qui ne sont pas dans 'b'
const not = (a, b) => {
  return a.filter((value) => {
    // Si l'objet est une image de section (avec order), on compare par imageId
    const bIds = b.map(item => item.id || item.imageId);
    return !bIds.includes(value.id || value.imageId);
  });
};

// Retourne les éléments communs à 'a' et 'b'
const intersection = (a, b) => {
  const bIds = b.map(item => item.id || item.imageId);
  return a.filter((value) => bIds.includes(value.id || value.imageId));
};

// Simplifie la comparaison des objets pour le `checked`
const getUniqueId = (item) => item.id || item.imageId;

export { not, intersection, getUniqueId };