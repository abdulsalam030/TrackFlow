import React, { useEffect, useState } from "react";
import Playlists from "./Playlists";
import RecommendedPlaylists from "./RecommendedPlaylists";
const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("spotify_access_token");
      if (!token) {
        console.error("No access token found");
        return;
      }

      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.error("Failed to fetch user data", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("User Data:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white px-4 py-6 space-y-8">
      {user ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
          <img
            src={user.images?.[0]?.url || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-green-500"
          />
          <h1 className="text-2xl font-bold">Welcome, {user.display_name}</h1>
        </div>
      ) : (
        <p className="text-md font-semibold">Loading user data...</p>
      )}

      <div className="w-full text-center">
        <div
          className="relative bg-cover bg-center h-[40vh] flex flex-col items-center justify-center text-center px-4"
          style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Discover and Create Personalized Playlists{" "}
          </h1>
          <p className="text-md text-gray-300 mb-3">
            Your personalized music experience starts here.
          </p>
          <button className="bg-green-500 text-black px-5 py-2 rounded-lg text-md font-semibold hover:bg-green-600">
            Start Listening
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <RecommendedPlaylists />
        <Playlists />
      </div>
    </div>

    // <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white px-4 py-6 space-y-8">
    //   {user && (
    //     <h1 className="text-2xl font-bold">Welcome, {user.display_name}</h1>
    //   )}
    //   <RecommendedPlaylists />
    //   {/* <Playlists /> */}
    // </div>
  );
};

export default Home;
