"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (!name || !email || !password) {
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

    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );

    const userExists = existingUsers.some((u: any) => u.email === email);
    if (userExists) {
      Swal.fire({
        title: "Error",
        text: "Este correo ya está registrado",
        icon: "error",
        confirmButtonColor: "#4f46e5",
        background: "#1f2937",
        color: "#ffffff",
      });
      return;
    }

    const newUser = { name, email, password };
    existingUsers.push(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    Swal.fire({
      title: "¡Registro exitoso!",
      text: "Tu cuenta ha sido creada correctamente.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: "#1f2937",
      color: "#ffffff",
    }).then(() => {
      router.push("/login");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Registrarse</h2>
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Leonardo"
          />
        </div>
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
          Registrarse
        </button>
        <div className="text-center text-sm text-gray-400 mt-4">
          <Link href="/login" className="text-indigo-400 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
