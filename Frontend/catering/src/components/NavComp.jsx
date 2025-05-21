"use client";
import { useState } from "react";
import Link from "next/link";
import { DarkThemeToggle } from "flowbite-react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Modal,
} from "flowbite-react";
import Image from "next/image";
import LoginForm from "./login";
import RegisterForm from "./register";

function NavbarComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand href="/">
          <Image src="/icons/logo.svg" width={100} height={100} alt="Logo" />
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button onClick={() => setOpenModal(true)}>Iniciar Sesión</Button>
          <NavbarToggle />
          <DarkThemeToggle />
        </div>
        <NavbarCollapse>
          <Link href="/">Home</Link>
          <Link href="/about">Acerca de Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/testimonios">Testimonios</Link>
          <Link href="/contact">Contacto</Link>
        </NavbarCollapse>
      </Navbar>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        dismissible={true}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Iniciar Sesión
          </h3>
          <LoginForm
            onRegisterClick={() => {
              setOpenModal(false);
              setOpenRegisterModal(true);
            }}
          />
        </div>
      </Modal>

      <Modal
        show={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        dismissible={true}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Registro
          </h3>
          <RegisterForm
            onIniciarSesionClick={() => {
              setOpenRegisterModal(false);
              setOpenModal(true);
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default NavbarComponent;
