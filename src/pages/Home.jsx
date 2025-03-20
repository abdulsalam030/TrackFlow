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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl text-center max-w-lg mx-auto transform transition duration-300 hover:scale-105">
          <div className="relative">
            <img
              src={user.images?.[0]?.url || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-400 shadow-lg"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></div>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Welcome, {user.display_name}
          </h1>
        </div>
      ) : (
        <p className="text-md font-semibold">Loading user data...</p>
      )}

      <div className="w-full text-center mt-[-60px]">
        <div
          className="relative bg-cover bg-center h-[40vh] flex flex-col items-center justify-center text-center px-4"
          style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Discover your Personalized Playlists{" "}
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
        {/* <Playlists /> */}
      </div>
    </div>
  );
};

export default Home;
