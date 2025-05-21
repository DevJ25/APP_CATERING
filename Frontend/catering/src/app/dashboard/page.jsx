"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Si no hay token o datos de usuario, redirigir al login
      router.push("/");
      return;
    }

    // Establecer datos del usuario
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    // Eliminar datos de sesión
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirigir al login
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Catering App</h1>
          <div className="flex items-center">
            <span className="mr-4">
              Bienvenido, {user.nombres} {user.apellidos}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Panel de Control</h2>
          <p>
            Has iniciado sesión correctamente como:{" "}
            <strong>{user.nombreUsuario}</strong>
          </p>
          <p className="mt-4">
            Aquí irá el contenido principal de tu aplicación.
          </p>
        </div>
      </div>
    </div>
  );
}
