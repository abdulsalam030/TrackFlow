export const fetchGenres = async () => {
  return [
    "pop",
    "rock",
    "hip-hop",
    "jazz",
    "classical",
    "edm",
    "blues",
    "soul",
    "metal",
    "country",
    "folk",
    "reggae",
  ];
};

export const fetchGenrePlaylists = async (genre) => {
  const token = localStorage.getItem("spotify_access_token");
  if (!token) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${genre}&type=playlist`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log("Spotify API Response:", data);

    return data.playlists?.items || [];
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
};
