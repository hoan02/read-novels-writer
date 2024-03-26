export const getNovels = async () => {
  const res = await fetch(`http://localhost:3000/api/novels`);
  if (!res.ok) {
    throw new Error("Failed to fetch novels");
  }
  return res.json();
};
