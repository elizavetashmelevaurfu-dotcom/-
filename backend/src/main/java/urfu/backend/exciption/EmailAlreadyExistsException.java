package urfu.backend.exciption;

public class EmailAlreadyExistsException extends BusinessException {
    public EmailAlreadyExistsException(String email) {
        super("User with email '%s' already exists".formatted(email), "EMAIL_ALREADY_EXISTS");
    }
}
