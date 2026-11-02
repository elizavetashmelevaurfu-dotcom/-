package urfu.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "residential_complexes")
public class ResidentialComplex {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "zhk_metro", joinColumns = @JoinColumn(name = "zhk_id"))
    @Column(name = "station")
    private List<String> metroStations = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "zhk_districts", joinColumns = @JoinColumn(name = "zhk_id"))
    @Column(name = "district")
    private List<String> districts = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "zhk_apartment_types", joinColumns = @JoinColumn(name = "zhk_id"))
    @Column(name = "apartment_type")
    private List<String> apartmentTypes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "zhk_euro_formats", joinColumns = @JoinColumn(name = "zhk_id"))
    @Column(name = "euro_format")
    private List<String> euroFormats = new ArrayList<>();

    @Column(nullable = false)
    private Integer minArea;

    @Column(nullable = false)
    private Integer maxArea;

    @Column(nullable = false)
    private Integer Floor;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "zhk_renovations", joinColumns = @JoinColumn(name = "zhk_id"))
    @Column(name = "renovation")
    private List<String> renovationTypes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "zhk_finance", joinColumns = @JoinColumn(name = "zhk_id"))
    @Column(name = "instrument")
    private List<String> financialInstruments = new ArrayList<>();

    @Column(nullable = false)
    private Integer completionYear;
}