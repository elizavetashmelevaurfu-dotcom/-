package urfu.backend.domain;

public enum Renovation {
    WITHOUT_RENOVATION("Без отделки"),
    ROUGH("Черновая"),
    PRE_FINISHING("Предчистовая (или \"белая коробка\")"),
    FINISHED("Чистовая"),
    WITH_REPAIR("С ремонтом (отделкой)"),
    WITH_FURNITURE("С отделкой и мебелью");

    private final String label;
    Renovation(String label) { this.label = label; }
    public String getLabel() { return label; }
}
