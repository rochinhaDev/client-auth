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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //lógica de submit do form
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

      //GUARDAR O TOKEN
      const token = response.data.token;
      const userId = response.data.user._id;
      const userRole = response.data.user.role;

      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);

      if (userType === "user") navigate("/profile");
      if (userType === "business") navigate("/profile-business");
    } catch (error) {
      // lógica se der erro na requisição
      console.log(error);
    }
  }

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="flex justify-center text-2xl font-bold mb-4">
          Login Page
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row justify-center items-center space-x-4">
            <label className="flex flex-row items-center">
              <input
                type="radio"
                name="userType"
                value="user"
                onChange={handleRadio}
                className="text-indigo-600 form-radio focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-900">Usuário</span>
            </label>

            <label className="flex flex-row items-center">
              <input
                type="radio"
                name="userType"
                value="business"
                onChange={handleRadio}
                className="text-indigo-600 form-radio focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-900">Empresa</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </button>
        </form>
        <p className="mt-10 text-center text-xs text-gray-500">
          Problemas com o login?{}
          <a
            href="https://wa.me/+5511981860227/?text=Não%20consegui%20me%20cadastrar%20no%20site"
            className="text-indigo-600"
          >
            {" "}
            Entre em contato com a gente.
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
