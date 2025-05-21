package app.catering.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.catering.Users.Usuario;

import java.util.Optional;

// Interfaz del repositorio para la entidad Usuario
// Extiende JpaRepository que proporciona operaciones CRUD básicas
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método para buscar un usuario por su nombre de usuario
    // Retorna un Optional que puede contener el usuario o estar vacío
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);  
    
    // Método para verificar si existe un usuario con un email específico
    // Retorna true si existe, false si no existe
    boolean existsByEmail(String email);
    
    // Método para verificar si existe un usuario con un nombre de usuario específico
    // Retorna true si existe, false si no existe
    boolean existsByNombreUsuario(String nombreUsuario);
}