import useFetchPhotos from "./hooks/useFetchPhotos";

function App() {
  const { photos, loading, error } = useFetchPhotos();

  if (loading) {
    return <h1>Loading photos...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Photos Loaded: {photos.length}</h1>

      {photos.map((photo) => (
        <div key={photo.id}>
          <img
            src={photo.download_url}
            alt={`Photo by ${photo.author}`}
            width="200"
          />
          <p>{photo.author}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
