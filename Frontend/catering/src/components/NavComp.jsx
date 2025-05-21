"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DarkThemeToggle,
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Modal,
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import Image from "next/image";
import LoginForm from "./login";
import RegisterForm from "./register";

function NavbarComponent() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setOpenModal(false);
    router.push("/"); // Redirigir al dashboard después de login
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <Navbar fluid rounded className="bg-amber-700 text-white shadow-md">
        <NavbarBrand href="/">
          <Image
            src="/icons/logo.svg"
            width={100}
            height={100}
            alt="Logo"
            priority
          />
        </NavbarBrand>

        <div className="flex md:order-2 items-center gap-4">
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt={`${user.nombres} ${user.apellidos}`}
                  img="/default-avatar.png"
                  rounded
                  bordered
                  color="purple"
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm font-semibold">
                  {user.nombres} {user.apellidos}
                </span>
                <span className="block truncate text-sm text-gray-500">
                  {user.email || user.nombreUsuario}
                </span>
              </DropdownHeader>
              <DropdownItem href="/dashboard">Mi Cuenta</DropdownItem>
              <DropdownItem href="/settings">Configuración</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleLogout}>Cerrar sesión</DropdownItem>
            </Dropdown>
          ) : (
            <Button
              onClick={() => setOpenModal(true)}
              gradientduotone="purpleToBlue"
            >
              Iniciar Sesión
            </Button>
          )}
          <DarkThemeToggle />
          <NavbarToggle />
        </div>

        <NavbarCollapse className="text-green-50">
          <Link href="/" className=" hover:text-green-600">
            Inicio
          </Link>
          <Link href="/about" className=" hover:text-green-600">
            Nosotros
          </Link>
          <Link href="/servicios" className=" hover:text-green-600">
            Servicios
          </Link>
          <Link href="/contact" className=" hover:text-green-600">
            Contacto
          </Link>
        </NavbarCollapse>
      </Navbar>

      {/* Modal de Login */}
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="md"
        dismissible
      >
        <div className="border-b-0 pb-0">
          <h3 className="text-xl font-semibold text-gray-900">
            Iniciar Sesión
          </h3>
        </div>
        <main>
          <LoginForm
            onRegisterClick={() => {
              setOpenModal(false);
              setOpenRegisterModal(true);
            }}
            onLoginSuccess={handleLoginSuccess}
          />
        </main>
      </Modal>

      {/* Modal de Registro */}
      <Modal
        show={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        size="md"
        dismissible
      >
        <div className="border-b-0 pb-0">
          <h3 className="text-xl font-semibold text-gray-900">Crear Cuenta</h3>
        </div>
        <main>
          <RegisterForm
            onIniciarSesionClick={() => {
              setOpenRegisterModal(false);
              setOpenModal(true);
            }}
          />
        </main>
      </Modal>
    </>
  );
}

export default NavbarComponent;
