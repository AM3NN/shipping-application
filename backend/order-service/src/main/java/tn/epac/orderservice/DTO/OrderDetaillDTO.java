package tn.epac.orderservice.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OrderDetaillDTO(
        @JsonProperty String id,
        @JsonProperty String Reference,
        @JsonProperty String bindingType,
        @JsonProperty String partStatus,
        @JsonProperty boolean securityLabel,
        @JsonProperty boolean shrinkwrap,
        @JsonProperty boolean threeHoleDrill,
        @JsonProperty String perf,
        @JsonProperty int productionPage,
        @JsonProperty double thickness,
        @JsonProperty double height,
        @JsonProperty double width,
        @JsonProperty double weight,
        @JsonProperty String textPaperType,
        @JsonProperty String coverFinishType,
        @JsonProperty String textColor,
        @JsonProperty String siren,
        @JsonProperty int quantity
) {}