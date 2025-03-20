import { useEffect, useState } from "react";
import Spinners from "../components/Spinners";

const Landing = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scopes =
      "user-top-read playlist-read-private user-read-recently-played";
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to TrackFlow</h1>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-black px-6 py-2 text-lg font-bold rounded-lg hover:bg-green-600 flex items-center justify-center relative"
      >
        Login with Spotify
        {loading && <Spinners />}
      </button>
    </div>
  );
};
export default Landing;
