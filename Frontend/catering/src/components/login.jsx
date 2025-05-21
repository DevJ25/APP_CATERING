"use client";
import React, { useState } from "react";
import Image from "next/image";

const API_URL = "http://localhost:8084";

const LoginForm = ({ onRegisterClick, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Limpiar errores al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombreUsuario || !formData.password) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario: formData.nombreUsuario,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Credenciales incorrectas");
      }

      // Estructura esperada del backend:
      // {
      //   "token": "jwt.token.here",
      //   "nombreUsuario": "usuario123",
      //   "nombres": "Juan",
      //   "apellidos": "Pérez",
      //   "email": "juan@example.com"
      // }

      // Guardar datos en localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          nombreUsuario: data.nombreUsuario,
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
        })
      );

      // Notificar al componente padre
      onLoginSuccess({
        nombreUsuario: data.nombreUsuario,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
      });
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-row w-full h-full items-center justify-center h-screen bg-blue-700">
      <div className="bg-yellow-400 w-[80%] h-auto flex justify-center items-center p-4">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>

          {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Nombre de Usuario"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                className="p-2 rounded border border-gray-300"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 rounded border border-gray-300"
                required
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onRegisterClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Registrarse
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 text-white px-4 py-2 rounded transition-colors ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-cyan-400 w-[10%] h-auto flex justify-center items-center p-4">
        <Image
          src="/icons/logo.svg"
          width={100}
          height={100}
          alt="Logo"
          priority
        />
      </div>
    </main>
  );
};

export default LoginForm;
