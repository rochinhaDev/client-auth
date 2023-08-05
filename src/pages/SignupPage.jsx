import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    telefone: "",
    password: "",
  });
  const [photo, setPhoto] = useState("");
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  async function getUrl(photo) {
    try {
      const multPartForm = new FormData();
      multPartForm.append("picture", photo);
      const response = await api.post("/upload/file", multPartForm);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = await getUrl(photo);
      const formWithPhoto = {
        ...form,
        profilePicture: url,
      };
      console.log(formWithPhoto);
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        formWithPhoto
      );
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  function handlePhoto(e) {
    //console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
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
      <label>Foto de Perfil</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handlePhoto}
      />
      <button onClick={handleSubmit}>Cadastre-se</button>
    </form>
  );
}

export default SignupPage;
