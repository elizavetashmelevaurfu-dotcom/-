package urfu.backend.domain;

public enum PurchaseTimeframe {
    ASAP("В ближайшее время"),
    WITHIN_MONTH("В течение месяца"),
    WITHIN_3_MONTHS("В ближайшие 3 месяца"),
    WITHIN_HALF_YEAR("В ближайшие полгода");

    private final String label;
    PurchaseTimeframe(String label) { this.label = label; }
    public String getLabel() { return label; }
}
