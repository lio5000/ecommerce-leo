"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; //esto es para redirigir al usuario luego de validar los datos
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // aca tuve un problema con las versiones, ya que FormEvent me salia como deprecated, entonces encontre como solucion poner any
  // a pesar que evita el tipado
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
        confirmButtonColor: "#4f46e5",
        background: "#1f2937",
        color: "#ffffff",
      });
      return;
    }

    const storedUsers = localStorage.getItem("registeredUsers");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const foundUser = parsedUsers.find(
        (u: any) => u.email === email && u.password === password,
      );

      if (foundUser) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email: foundUser.email }),
        );
        window.dispatchEvent(new Event("authUpdated"));

        Swal.fire({
          title: "¡Bienvenido!",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#ffffff",
        }).then(() => {
          router.push("/");
        });
        return;
      }
    }

    Swal.fire({
      title: "Error",
      text: "Credenciales incorrectas o usuario no registrado.",
      icon: "error",
      confirmButtonColor: "#4f46e5",
      background: "#1f2937",
      color: "#ffffff",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Iniciar Sesion</h2>
        <div>
          <label className="block text-sm font-medium">
            Correo Electronico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="usuario@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded font-semibold transition-colors"
        >
          Iniciar Sesion
        </button>
        <div className="text-center text-sm text-gray-400 mt-4">
          <Link href="/register" className="text-indigo-400 hover:underline">
            Registrarse
          </Link>
        </div>
      </form>
    </div>
  );
}
