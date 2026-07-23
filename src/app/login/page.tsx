"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; //esto es para redirigir al usuario luego de validar los datos
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // aca tuve un problema con las versiones, ya que FormEvent me salia como deprecated, entonces encontre como solucion poner any
  // a pesar que evita el tipado
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Campos incompletos");
      return;
    }
    const storedUser = localStorage.getItem("registeredUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        localStorage.setItem("user", JSON.stringify({ email }));
        router.push("/");
        return;
      }
    }
    alert("Credenciales incorrectas o usuario no registrado");
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
