import { useState, useEffect } from "react";
import api from "../axios/api";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function getProfile() {
      try {
        const reponse = await api.get("/user/profile");
        setUser(reponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <div border="flex gap-1px solid black">
      <h1 className="text-blue-500 text-3xl">Profile Page</h1>
      <h1>Olá, {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <img
        src={user.profilePicture}
        alt={user.name}
        width={100}
        className="rounded"
        border="1px solid black"
      />
      <button
        className="bg-gray-200 text-blue-500 text-btn 1px"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
