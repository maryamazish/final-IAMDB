export const isFavorite = (favorites, movieId) => {
  return favorites.some((favoriteId) => favoriteId === movieId);
};

