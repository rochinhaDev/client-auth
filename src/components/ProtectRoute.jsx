import { useNavigate } from "react-router-dom";
export default function ProtectRoute({ Component }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  if (token) {
    return <Component />;
  } else {
    navigate("/login");
  }
  return;
}
