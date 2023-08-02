import { useState, useEffect } from "react";
import api from "../axios/api";
function ProfilePage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getProfile() {
      try {
        const reponse = await axios.get("/user/profile");
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
    </div>
  );
}

export default ProfilePage;
