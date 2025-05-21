package app.catering.Users;
import jakarta.persistence.*;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "El DNI es obligatorio")
    private String dni;

    @Column(nullable = false)
    @NotBlank(message = "Nombres son obligatorios")
    private String nombres;

    @Column(nullable = false)
    @NotBlank(message = "Apellidos son obligatorios")
    private String apellidos;

    @Column(nullable = false)
    @NotBlank(message = "Teléfono es obligatorio")
    private String telefono;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Nombre de usuario es obligatorio")
    private String nombreUsuario;

    @Column(nullable = false)
    @NotBlank(message = "Contraseña es obligatoria")
    private String password;

    @Column(nullable = false, unique = true)
    @Email(message = "Correo electrónico no válido")
    private String email;
}
