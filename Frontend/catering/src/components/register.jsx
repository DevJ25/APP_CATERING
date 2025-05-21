"use client";
import React, { useState } from "react";
import Image from "next/image";

const API_URL = "http://localhost:8084";

const RegisterForm = ({ onIniciarSesionClick }) => {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    nombreUsuario: "",
    password: "",
    email: "",
  });

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;
    let errorMessage = "";

    if (name === "dni" || name === "telefono") {
      if (!/^\d*$/.test(value)) {
        isValid = false;
        errorMessage = "Este campo solo puede contener números";
      }
    } else if (name === "nombres" || name === "apellidos") {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
        isValid = false;
        errorMessage = "Este campo solo puede contener letras y espacios";
      }
    }

    if (isValid) {
      setFormData({ ...formData, [name]: value });
      setError("");
    } else {
      setError(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checked) {
      setError("Debe aceptar los términos y condiciones");
      return;
    }

    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    if (!allFieldsFilled) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/^\d+$/.test(formData.dni)) {
      setError("El DNI debe contener solo números");
      return;
    }

    if (!/^\d+$/.test(formData.telefono)) {
      setError("El teléfono debe contener solo números");
      return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombres)) {
      setError("Los nombres solo pueden contener letras y espacios");
      return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellidos)) {
      setError("Los apellidos solo pueden contener letras y espacios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      setSuccess("Usuario registrado correctamente!");

      setTimeout(() => {
        setFormData({
          dni: "",
          nombres: "",
          apellidos: "",
          telefono: "",
          nombreUsuario: "",
          password: "",
          email: "",
        });
        setChecked(false);
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error desconocido"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-row w-full h-full items-center justify-center h-screen bg-blue-700">
      <div className="bg-yellow-400 w-[80%] h-auto flex justify-center items-center p-4">
        <div className="flex flex-col w-full max-w-md">
          <h1 className="text-2xl font-bold">Crear Cuenta</h1>
          <h5 className="mb-2">Ingrese sus datos</h5>

          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="DNI"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                maxLength={8}
                className="p-2 rounded"
              />
              <input
                type="text"
                placeholder="Nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="p-2 rounded"
              />
              <input
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="p-2 rounded"
              />
              <input
                type="text"
                placeholder="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                maxLength={9}
                className="p-2 rounded"
              />
            </div>

            <h5 className="mt-2">Cree su usuario y su contraseña</h5>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Usuario"
                name="nombreUsuario"
                value={formData.nombreUsuario}
                onChange={handleChange}
                className="p-2 rounded"
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 rounded"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded"
            />

            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mr-2"
              />
              Acepto los términos y condiciones
            </label>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={onIniciarSesionClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Iniciar Sesión
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {loading ? "Registrando..." : "Registrarme"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-cyan-400 w-[10%] h-auto flex justify-center items-center p-4">
        <Image src="/icons/logo.svg" width={100} height={100} alt="Logo" />
      </div>
    </main>
  );
};

export default RegisterForm;
