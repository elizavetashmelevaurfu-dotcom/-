package urfu.backend.DTO;

import jakarta.validation.constraints.*;
import urfu.backend.domain.PurchaseTimeframe;
import urfu.backend.domain.Renovation;

import java.util.List;

public record QuestionnaireRequest(

        @NotEmpty(message = "Укажите хотя бы один город")
        List<String> cities,

        @NotEmpty(message = "Укажите хотя бы один район")
        List<String> districts,

        List<String> metroStations,

        int maxWalkTimeToMetro,

        @NotEmpty(message = "Выберите хотя бы один тип квартиры")
        List<String> apartmentTypes,

        @NotNull @Min(5) @Max(3000)
        Integer minArea,

        @NotNull @Min(5) @Max(3000)
        Integer maxArea,

        @NotNull @Min(1) @Max(100)
        Integer minFloor,

        @NotNull @Min(1) @Max(100)
        Integer maxFloor,

        @NotNull
        Renovation renovation,

        @NotNull
        PurchaseTimeframe purchaseTimeframe,

        @NotNull @Min(2019) @Max(2040)
        Integer minCompletionYear,

        @NotNull @Min(2019) @Max(2040)
        Integer maxCompletionYear
) {
    @AssertTrue(message = "minArea не может быть больше maxArea")
    public boolean isAreaRangeValid() {
        return minArea == null || maxArea == null || minArea <= maxArea;
    }

    @AssertTrue(message = "minFloor не может быть больше maxFloor")
    public boolean isFloorRangeValid() {
        return minFloor == null || maxFloor == null || minFloor <= maxFloor;
    }

    @AssertTrue(message = "Год начала сдачи не может быть больше года окончания")
    public boolean isYearRangeValid() {
        return minCompletionYear == null || maxCompletionYear == null
                || minCompletionYear <= maxCompletionYear;
    }
}