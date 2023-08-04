import { useState, useEffect } from "react";
import api from "../axios/api";
function ProfilePage() {
  const [user, setUser] = useState({});
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
  return (
    <div>
      <h1>Profile Page</h1>
      <h1>Olá, {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <img src={user.profilePicture} alt={user.name} />
    </div>
  );
}

export default ProfilePage;
