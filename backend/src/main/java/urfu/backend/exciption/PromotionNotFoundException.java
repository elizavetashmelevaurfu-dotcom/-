package urfu.backend.exciption;

public class PromotionNotFoundException extends RuntimeException {
    public PromotionNotFoundException(Object id) {
        super("Акция не найдена: id=" + id);
    }
}
