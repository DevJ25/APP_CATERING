"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const LoginForm = ({ onRegisterClick }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar errores al escribir
    setErrors({
      ...errors,
      [name]: "",
      general: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = "El usuario es requerido";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar token en localStorage o cookies
      localStorage.setItem("authToken", data.token);

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (error) {
      setErrors({
        ...errors,
        general: error.message || "Credenciales incorrectas",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-center">
        <Image src="/icons/logo.svg" width={100} height={100} alt="Logo" />
      </div>
      <h2 className="text-xl font-semibold text-center">Iniciar Sesión</h2>

      {errors.general && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa tu usuario"
            className={`w-full p-2 border rounded ${errors.username ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          <button
            type="button"
            onClick={onRegisterClick}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Registrarme
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
