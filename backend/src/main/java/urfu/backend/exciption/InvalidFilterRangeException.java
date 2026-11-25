package urfu.backend.exciption;

public class InvalidFilterRangeException extends BusinessException {
    public InvalidFilterRangeException(String message) {
        super(message, "INVALID_FILTER_RANGE");
    }
}
