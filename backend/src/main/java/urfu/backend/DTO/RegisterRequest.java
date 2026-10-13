package urfu.backend.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Username cannot be empty")
        String username,
        @NotBlank @Email(message = "Invalid email format")
        String email,
        @NotBlank @Size(min = 8, message = "Password must be at least 8 characters")
        String password
) {}
