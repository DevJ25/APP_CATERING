const API_URL = "http://localhost:8084";

// Función auxiliar para realizar solicitudes autenticadas
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // Configuración por defecto
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Si hay token, lo agregamos a los headers
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  // Combinar las opciones por defecto con las proporcionadas
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      // Si el status es 401 (Unauthorized), cerramos sesión
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        throw new Error("Sesión expirada. Por favor inicie sesión nuevamente.");
      }

      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la solicitud");
    }

    // Si la respuesta está vacía o es una respuesta 204 No Content
    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return null;
    }

    // Intentamos parsear la respuesta como JSON
    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud API:", error);
    throw error;
  }
};

// Servicios de autenticación
export const authService = {
  login: (credentials) =>
    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((res) => res.json()),

  register: (userData) =>
    fetch(`${API_URL}/api/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then((res) => res.json()),
};
