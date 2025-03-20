import { useEffect, useState } from "react";
import { fetchGenres, fetchGenrePlaylists } from "../utils/spotify";
import spotify from "../assets/spotify.webp";
import Spinners from "../components/spinners";

const GenrePlaylist = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
      setSelectedGenre(genreList[0]); // Default to first genre
    };

    loadGenres();
  }, []);

  const fetchPlaylists = async () => {
    if (!selectedGenre) return;
    setLoading(true);
    const data = await fetchGenrePlaylists(selectedGenre);
    setPlaylists(data);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen ">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Spotify Genre Playlists
      </h1>

      <div className="flex gap-4 mb-6 justify-center">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded-md"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={fetchPlaylists}
          className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 flex items-center justify-center relative w-44"
        >
          <span className="mr-2">Get Playlists</span>
          {loading && <Spinners />}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {playlists.map((playlist) => {
          const firstItem = playlist?.items?.[0];
          const imageUrl =
            firstItem?.images?.[0]?.url || playlist?.images?.[0]?.url;

          return (
            <a
              key={firstItem?.id || playlist?.id}
              href={
                firstItem?.external_urls?.spotify ||
                playlist?.external_urls?.spotify
              }
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={playlist?.name || firstItem?.name || "No Image"}
                  className="w-full rounded-md mb-2"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-800 rounded-md">
                  <img
                    src={spotify}
                    alt="Spotify"
                    className="w-25 h-25 opacity-50"
                  />
                </div>
              )}
              <p className="text-sm font-semibold">
                {playlist?.name || "Untitled Playlist"}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default GenrePlaylist;
