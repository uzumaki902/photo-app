import { useState, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import useFavorites from "../hooks/useFavorites";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const { favorites, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [photos, search]);

  if (loading) {
    return (
      <div
        className="flex min-h-64 flex-col items-center justify-center gap-3"
        role="status"
        aria-label="Loading photos"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <p className="text-sm text-gray-500">Loading photos...</p>
      </div>
    );
  }
  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold">Photo Gallery</h1>

        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search by author..."
          aria-label="Search photos by author"
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {filteredPhotos.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            No photos found. Try a different author name.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <article
                key={photo.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={photo.download_url}
                  alt={`Photo by ${photo.author}`}
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    className={`ml-3 text-2xl transition-transform duration-200 hover:scale-110 active:scale-90 ${
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
        )}
      </div>
    </main>
  );
}

export default Gallery;
