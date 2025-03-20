import React, { useEffect, useState } from "react";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (!token) return;

      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPlaylists(data.items || []);
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 mt-[-30px]">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 cursor-pointer"
          >
            <img
              src={playlist.images[0]?.url || "https://via.placeholder.com/100"}
              alt={playlist.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{playlist.name}</h2>
            <p className="text-gray-400">{playlist.tracks.total} songs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
