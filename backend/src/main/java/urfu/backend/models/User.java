package urfu.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 100)
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    private Instant createdAt;
    private Instant lastLoginAt;

    // МЕТОДЫ ИНТЕРФЕЙСА UserDetails
    @Override
    @JsonIgnore
    @Transient
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    @JsonIgnore
    @Transient
    public boolean isAccountNonExpired() { return true; }

    @Override
    @JsonIgnore
    @Transient
    public boolean isAccountNonLocked() { return true; }

    @Override
    @JsonIgnore
    @Transient
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    @JsonIgnore
    @Transient
    public boolean isEnabled() {
        // ИСПОЛЬЗУЕМ СТАТУС: Если пользователь не ACTIVE, Spring не пустит его
        return status == UserStatus.ACTIVE;
    }
}