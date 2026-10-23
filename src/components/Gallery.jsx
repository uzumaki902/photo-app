import useFetchPhotos from "../hooks/useFetchPhotos";
import useFavorites from "../hooks/useFavorites";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const { favorites, toggleFavorite } = useFavorites();

  if (loading) {
    return <p className="p-6 text-center">Loading photos...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="mx-auto max-w-7xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Photo Gallery</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="h-56 w-full object-cover"
            />

            <div className="flex items-center justify-between p-3">
              <p className="truncate font-medium text-gray-800">
                {photo.author}
              </p>

              <button
                type="button"
                aria-label={
                  favorites.includes(photo.id)
                    ? `Remove ${photo.author} from favourites`
                    : `Add ${photo.author} to favourites`
                }
                aria-pressed={favorites.includes(photo.id)}
                onClick={() => toggleFavorite(photo.id)}
                className={`ml-3 text-2xl ${
                  favorites.includes(photo.id)
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                {favorites.includes(photo.id) ? "♥" : "♡"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Gallery;
