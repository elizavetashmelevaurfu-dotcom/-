package urfu.backend.exciption;

public class ResidentialComplexNotFoundException extends RuntimeException {
    public ResidentialComplexNotFoundException(Object id) {
        super("ЖК не найден: id=" + id);
    }
}
