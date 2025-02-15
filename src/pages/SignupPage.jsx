import { useState } from "react";
import axios from "axios";
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
  const [photo, setPhoto] = useState();

  const [userType, setUserType] = useState("user");

  // controll input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function getUrl(photo) {
    //photo = state com a foto guardada
    try {
      const multiPartForm = new FormData();

      multiPartForm.append("picture", photo);

      const response = await api.post("/upload/file", multiPartForm);

      console.log(response);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    //lógica de submit do form
    e.preventDefault();
    console.log("Botão de cadastrar foi clicado");
    try {
      // const url = chamada para api de upload
      console.log("Invocação da função para pegar a url");

      const url = await getUrl(photo);

      console.log("Upload feito. Url da foto: ", url);

      const formWithPhoto = {
        ...form,
        profilePicture: url,
      };

      console.log("Form com a url da foto adicionado");

      if (userType === "user") {
        await axios.post("http://localhost:4000/user/signup", formWithPhoto);
      }
      if (userType === "business") {
        await axios.post(
          "http://localhost:4000/business/signup",
          formWithPhoto
        );
      }

      navigate("/login");
    } catch (error) {
      // lógico se der erro na requisição
      alert("Erro ao cadastrar usuário");
      console.log(error);
    }
  }

  function handlePhoto(e) {
    //  console.log(e.target.files[0]); -> onde a foto está guardada
    setPhoto(e.target.files[0]);
    console.log("Foto foi escolhida");
  }

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  return (
    <div>
      <div className="flex min-h-full justify-center items-center bg-gray-100">
        <div className="sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 text-gray-900">
            Cadastre-se na sua conta
          </h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-evenly space-x-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Usuário
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  onChange={handleRadio}
                  checked={userType === "user"}
                  className="ml-2"
                />
              </label>

              <label className="block text-sm font-medium leading-6 text-gray-900">
                Empresa
                <input
                  type="radio"
                  name="userType"
                  value="business"
                  onChange={handleRadio}
                  checked={userType === "business"}
                  className="ml-2"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome Completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone
              </label>
              <div className="mt-2">
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Foto de perfil
              </label>
              <div className="flex items-center mt-1 ">
                <label
                  htmlFor="photo"
                  className="w-full text-center cursor-pointer bg-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-600 rounded-md shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 inline-block mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Escolher Foto
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                CADASTRE-SE
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Problemas com o cadastro?{" "}
            <a
              href="https://wa.me/+5511981860227/?text=Não%20consegui%20me%20cadastrar%20no%20site"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              target="_blank"
              rel="noreferrer noopener"
            >
              Entre em contato com a gente
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
