import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        form
      );
      console.log(response.data.token);
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      navigate("/profile");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(form);

  return (
    <div>
      <h1 className="text-blue-500 text-3xl">Login Page</h1>
      <form onSubmit={handleSubmit}></form>
      <div>
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
      <button classname="" type="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
