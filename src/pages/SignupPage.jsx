import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignupPage() {
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    telefone: "",
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
        "http://localhost:4000/user/signup",
        form
      );
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(form);
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup Page</h1>
      <div>
        <label>Nome Completo</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required={true}
        />
      </div>
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
        <label>Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required={true}
        />
      </div>
      <button onClick={handleSubmit}>Cadastre-se</button>
    </form>
  );
}

export default SignupPage;
