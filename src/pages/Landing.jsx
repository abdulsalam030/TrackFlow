import React from "react";

const Landing = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scopes =
      "user-top-read playlist-read-private user-read-recently-played";

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to AI Music Playlist</h1>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-black px-6 py-3 text-lg font-bold rounded-lg hover:bg-green-600"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Landing;
