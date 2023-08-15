import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState("user");
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response;

      if (userType === "user") {
        response = await axios.post("http://localhost:4000/user/login", form);
      }

      if (userType === "business") {
        response = await axios.post(
          "http://localhost:4000/business/login",
          form
        );
      }
      console.log(response.data.token);
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      if (userType === "user") navigate("/profile");
      if (userType === "business") navigate("/profile-businsess");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(form);
  function handleRadio(e) {}
  return (
    <div>
      <h1 className="text-blue-500 text-3xl">Login Page</h1>
      <form onSubmit={handleSubmit}></form>
      <div>
        <div>
          <label>Usuário</label>
          <input
            type="radio"
            name="userType"
            value="user"
            onChange={handleRadio}
          />
          <label>Empresa</label>
          <input
            type="radio"
            name="userType"
            value="business"
            onChange={handleRadio}
          />
        </div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required={true}
        />
      </div>
      <button className="" type="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
