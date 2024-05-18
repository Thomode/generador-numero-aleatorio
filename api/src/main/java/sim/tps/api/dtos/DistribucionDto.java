package sim.tps.api.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DistribucionDto {
    float[] serieGenerada;
    float[][] tabla;
    PruebaChiCuadradoDto pruebaChiCuadradoDto;
}
