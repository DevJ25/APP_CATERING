package app.catering.DTO;
import lombok.Data;

@Data
public class RegistroRequest {
    private String dni;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String nombre_usuario;
    private String password;
    private String email;
}
