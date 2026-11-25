package urfu.backend.exciption;

public class UsernameAlreadyExistsException extends BusinessException {
    public UsernameAlreadyExistsException(String username) {
        super("User with username '%s' already exists".formatted(username), "USERNAME_ALREADY_EXISTS");
    }
}
