package urfu.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import urfu.backend.domain.PurchaseTimeframe;
import urfu.backend.domain.Renovation;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Questionnaire_table")
@Getter
@Setter
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "filter_cities", joinColumns = @JoinColumn(name = "filter_id"))
    @Column(name = "city", nullable = false)
    private List<String> cities = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "filter_districts", joinColumns = @JoinColumn(name = "filter_id"))
    @Column(name = "district", nullable = false)
    private List<String> districts = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "filter_metro_stations", joinColumns = @JoinColumn(name = "filter_id"))
    @Column(name = "station")
    private List<String> metroStations = new ArrayList<>();

    @Column(name = "max_walk_time")
    private int maxWalkTimeToMetro;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "filter_apartment_types", joinColumns = @JoinColumn(name = "filter_id"))
    @Column(name = "apartment_type", nullable = false)
    private List<String> apartmentTypes = new ArrayList<>();

    @Column(nullable = false)
    private Integer minArea;

    @Column(nullable = false)
    private Integer maxArea;

    @Column(nullable = false)
    private Integer minFloor;

    @Column(nullable = false)
    private Integer maxFloor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Renovation renovation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PurchaseTimeframe purchaseTimeframe;

    @Column(nullable = false)
    private Integer minCompletionYear;

    @Column(nullable = false)
    private Integer maxCompletionYear;
}